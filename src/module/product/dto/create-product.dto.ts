import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  primary_category_name: string;

  @IsNumber()
  original_price: number;

  @IsString()
  @IsOptional()
  author: string;

  @IsNumber()
  discount: number;
}
