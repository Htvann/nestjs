import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import getMongooseUrl from './utils/get-mongoose-url';
import { UserModule } from './module/user/user.module';
import { AnimalModule } from './module/animal/animal.module';

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
