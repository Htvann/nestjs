import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ProductModule } from "./module/product/product.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./module/user/user.module";
import { AuthModule } from "./module/auth/auth.module";
import { LoggerMiddleware } from "./utils/middleware";
import { OrderModule } from './module/order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/amazon"),
    ProductModule,
    UserModule,
    AuthModule,
    OrderModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
