import { IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Types } from "mongoose";

class IProduct {
  @IsString()
  id: Types.ObjectId;

  @IsNumber()
  amount: number;
}

export class CreateOrderDto {
  @Type(() => IProduct)
  products: IProduct[];
}
