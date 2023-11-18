import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./module/user/user.module";
import { AuthModule } from "./module/auth/auth.module";
import { LoggerMiddleware } from "./utils/middleware";
import { AllExceptionFilter } from "./utils/httpExceptionFilter";
import { ProductModule } from './module/product/product.module';
import { AuthorModule } from './module/author/author.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/amazon"),
    UserModule,
    AuthModule,
    ProductModule,
    AuthorModule,
  ],
  providers: [
    {
      provide: "APP_FILTER",
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
