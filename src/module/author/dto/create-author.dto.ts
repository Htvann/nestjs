import { IsArray, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsArray()
  products: Types.ObjectId[];
}
