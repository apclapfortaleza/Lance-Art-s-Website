import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  findAll() {
    return this.guestbookService.findAll();
  }

  @Post()
  create(@Body() createGuestbookDto: { name: string; message: string }) {
    return this.guestbookService.create(createGuestbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // In Supabase, if your ID is a number, we keep it as a number
    return this.guestbookService.delete(Number(id));
  }
}
