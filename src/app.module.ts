import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/user/user.module';
import getMongooseUrl from './utils/get-mongoose-url';

@Module({
  imports: [
    MongooseModule.forRoot(getMongooseUrl(), {
      autoIndex: true,
      autoCreate: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
