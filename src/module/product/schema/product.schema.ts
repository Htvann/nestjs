import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Author } from "src/module/author/schema/author.schema";

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

  @Prop({ required: true, default: 0 })
  discount: number;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ default: null, type: Types.ObjectId, ref: "Author" })
  author: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  quantity_sold: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre("save", function (next) {
  this.price = this.original_price - this.discount;
  next();
});
