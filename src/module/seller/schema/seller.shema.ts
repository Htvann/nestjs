import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Product } from "src/module/product/schema/product.schema";

@Schema({ _id: false })
class Item extends Document {
  @Prop({ type: Types.ObjectId, ref: Product.name })
  product: Types.ObjectId;

  @Prop({ type: Number, required: true })
  total_product: number;

  @Prop({ default: 0 })
  quantity_sold: number;
}
const ItemSchema = SchemaFactory.createForClass(Item);

@Schema()
export class Seller extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  total_revenue: number;
  @Prop({ type: [ItemSchema], required: true })
  products: Item[];
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
