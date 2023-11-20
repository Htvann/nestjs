import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

class Author {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;
}

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId })
  seller_id: Types.ObjectId;

  @Prop({ default: "" })
  primary_category_name: string;

  @Prop({ required: true, default: 0 })
  original_price: number;

  @Prop({ default: null })
  author: Author;

  @Prop({ required: true, default: 0 })
  discount: number;

  @Prop({ required: true, default: 0 })
  quantity_sold: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
