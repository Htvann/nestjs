import { Module } from '@nestjs/common';
import { AnimalModule } from './animal/animal.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AnimalModule,
    MongooseModule.forRoot('mongodb://localhost:27017/_freecodecamp', {
      autoIndex: true,
      autoCreate: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
