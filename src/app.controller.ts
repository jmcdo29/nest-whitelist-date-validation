import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getDate(@Query('date') date: Date) {
    return `typeof ${typeof date}`;
  }
}
