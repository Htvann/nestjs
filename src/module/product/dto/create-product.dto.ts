import { IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  primary_category_name: string;

  @IsNumber()
  original_price: number;

  @IsString()
  @IsOptional()
  author: Types.ObjectId;

  @IsNumber()
  discount: number;
}
