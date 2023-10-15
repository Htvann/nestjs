import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('animal')
export class AnimalController {
  // constructor() {}
  @Get('/')
  @UseGuards(AuthGuard)
  get(): string {
    return 'animal';
  }
}
