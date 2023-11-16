import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  total: number;

  @IsNumber()
  price: number;

  @IsString()
  alias: string;
}
