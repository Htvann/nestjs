import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { Types } from "mongoose";
import { Type } from "class-transformer";

class Item {
  @IsString()
  @IsNotEmpty()
  _id: Types.ObjectId;

  @IsNumber()
  @IsNotEmpty()
  total_product: number;
}

export class CreateSellerDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  products: Item[];
}
