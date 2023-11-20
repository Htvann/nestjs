import { IsMongoId, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateSellerDto {
  @IsString()
  name: string;

  @IsMongoId({ each: true })
  products: Types.ObjectId[];
}
