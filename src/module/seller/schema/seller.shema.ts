import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Product } from "src/module/product/schema/product.schema";

export class Seller extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 0 })
  total_revenue: number;

  @Prop({ type: [Types.ObjectId], ref: Product.name })
  products: Types.ObjectId[];
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
