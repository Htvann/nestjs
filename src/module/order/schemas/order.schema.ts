import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ProductDocument } from "src/module/product/schema/product.schema";

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop()
  product: ProductDocument[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
