import { PartialType } from "@nestjs/mapped-types";
import { CreateSellerDto } from "./create-seller.dto";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UpdateSellerDto extends PartialType(CreateSellerDto) {}

class Product {
  @IsString()
  id: string;

  @IsNumber()
  amount: number;
}

export class UserOrderDto {
  @ValidateNested({ each: true })
  @Type(() => Product)
  products: Product[];
}
