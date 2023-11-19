import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  primary_category_name: string;

  @IsNumber()
  original_price: number;

  @IsString()
  author: string;

  @IsNumber()
  price: number;

  @IsNumber()
  discount: number;

  @IsNumber()
  quantity_sold: number;
}
