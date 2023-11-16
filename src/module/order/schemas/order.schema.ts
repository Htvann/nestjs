import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type OrderDocument = Order & Document;

type IProduct = {
  id: Types.ObjectId;
  amount: number;
};

@Schema()
export class Order {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ default: [] })
  products: IProduct[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
