import { IsArray } from "class-validator";
import { ProductDocument } from "src/module/product/schema/product.schema";

export class CreateOrderDto {
  @IsArray()
  product: ProductDocument[];
}
