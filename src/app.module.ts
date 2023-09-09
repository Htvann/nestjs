import { Module } from '@nestjs/common';
import { AnimalModule } from './animal/animal.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import getMongooseUrl from './utils/get-mongoose-url';

@Module({
  imports: [
    UserModule,
    AnimalModule,
    MongooseModule.forRoot(getMongooseUrl(), {
      autoIndex: true,
      autoCreate: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
