import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Product } from "src/module/product/schema/product.schema";

class Item extends Document {
  @Prop({ type: Types.ObjectId, ref: Product.name })
  _id: Types.ObjectId;

  // @Prop({ type: Number, required: true, default: 0 })
  // total_product: number;

  // @Prop({ required: true, default: 0 })
  // quantity_sold: number;
}

@Schema()
export class Seller extends Document {
  // @Prop({ required: true })
  // name: string;
  //
  // @Prop({ required: true, default: 0 })
  // total_revenue: number;
  // @Prop({ type: Item, required: true, default: [] })
  // products: Item[];
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
