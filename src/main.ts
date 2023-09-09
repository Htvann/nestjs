import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config(); // Nạp biến môi trường từ tệp .env

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //validate
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('/api');

  console.log(`Server run at: http://localhost:${process.env.API_PORT}/api `);
  await app.listen(process.env.API_PORT);
}
main();
