import { IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

class IProduct {
  @IsString()
  id: string;

  @IsNumber()
  amount: number;
}

export class CreateOrderDto {
  @Type(() => IProduct)
  product: IProduct[];
}
