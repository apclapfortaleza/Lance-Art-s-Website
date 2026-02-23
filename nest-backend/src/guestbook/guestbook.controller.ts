import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
