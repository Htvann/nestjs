import { Module } from '@nestjs/common';
import { AnimalModule } from './animal/animal.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AnimalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
