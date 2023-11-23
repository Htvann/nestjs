import { Module } from "@nestjs/common";
import { SellerService } from "./seller.service";
import { SellerController } from "./seller.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Seller, SellerSchema } from "./schema/seller.shema";
import { ProductModule } from "../product/product.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }]),
    ProductModule,
  ],
  controllers: [SellerController],
  providers: [SellerService],
  exports: [SellerService],
})
export class SellerModule {}
