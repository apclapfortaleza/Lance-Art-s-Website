import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.warn("⚠️ SUPABASE_URL or SUPABASE_KEY environment variables are missing! Database connection will fail.");
    }
    
    this.supabase = createClient(supabaseUrl || '', supabaseKey || '');
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
