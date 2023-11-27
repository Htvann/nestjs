import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { UserModule } from "./module/user/user.module";
import { AuthModule } from "./module/auth/auth.module";
import { LoggerMiddleware } from "./utils/middleware";
import { AllExceptionFilter } from "./utils/httpExceptionFilter";
import { ProductModule } from "./module/product/product.module";
import { AuthorModule } from "./module/author/author.module";
import { SellerModule } from "./module/seller/seller.module";
import { ConfigModule } from "@nestjs/config";
import config from "./config";
import { DatabaseModule } from "./database/database.module";
import { environments } from "./common/env";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments.dev,
      load: [config],
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: "localhost",
            port: 6379,
          },
        }),
        ttl: 0,
      }),
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ProductModule,
    AuthorModule,
    SellerModule,
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
