import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Product } from "src/module/product/schema/product.schema";

@Schema()
export class Author extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Types.ObjectId], ref: Product.name })
  products: Product[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
