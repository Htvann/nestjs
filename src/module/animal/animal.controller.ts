import { Controller, Get } from '@nestjs/common';

@Controller('animal')
export class AnimalController {
  // constructor() {}
  @Get('/')
  get(): string {
    return 'animal';
  }
}
