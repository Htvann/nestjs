import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //validate
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
main();
