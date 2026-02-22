import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase: SupabaseClient;

  constructor() {
    // We use the keys provided (usually these should be in a .env file, but since we are deploying directly, we can define them locally or require them inside the environment variables on Vercel)
    const supabaseUrl = process.env.SUPABASE_URL || 'https://djhsnjdaoauhceqzwrvy.supabase.co';
    const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqaHNuamRhb2F1aGNlcXp3cnZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNjc0ODgsImV4cCI6MjA4NDY0MzQ4OH0.ygy-LzfvSWc2iCgT1kCOVSae-exvVtm4V4BwItGAyC0';
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async findAll() {
    const { data, error } = await this.supabase
      .from('Guestbook')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Supabase error fetching guestbook:', error);
      throw new InternalServerErrorException('Failed to fetch guestbook messages');
    }
    return data || [];
  }

  async create(data: { name: string; message: string }) {
    const { data: newEntry, error } = await this.supabase
      .from('Guestbook')
      .insert([
        { name: data.name, message: data.message }
      ])
      .select();

    if (error) {
       console.error('Supabase error creating entry:', error);
       throw new InternalServerErrorException('Failed to create guestbook message');
    }
    return newEntry[0];
  }

  async delete(id: number) {
    const { data, error } = await this.supabase
      .from('Guestbook')
      .delete()
      .match({ id })
      .select();

    if (error) {
       console.error('Supabase error deleting entry:', error);
       throw new InternalServerErrorException('Failed to delete guestbook message');
    }
    return data;
  }
}
