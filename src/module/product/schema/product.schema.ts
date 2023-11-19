import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Author } from "src/module/author/schema/author.schema";

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId })
  seller_id: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  original_price: number;

  @Prop({ type: Types.ObjectId, ref: Author.name })
  author_id: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ required: true, default: 0 })
  discount: number;

  @Prop({ required: true, default: 0 })
  quantity_sold: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
