import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import getMongooseUrl from './utils/get-mongoose-url';
import { UserModule } from './module/user/user.module';
import { AnimalModule } from './module/animal/animal.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(getMongooseUrl(), {
      autoIndex: true,
      autoCreate: true,
    }),
    UserModule,
    AnimalModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
