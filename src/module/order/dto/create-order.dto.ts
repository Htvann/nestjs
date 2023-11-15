import { Prop } from "@nestjs/mongoose";
import { IsArray } from "class-validator";
import { Types } from "mongoose";

export class CreateOrderDto {
  @IsArray()
  @Prop({ default: [] })
  product: Types.ObjectId[];
}
