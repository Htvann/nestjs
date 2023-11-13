import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./schema/product.schema";
import { Model } from "mongoose";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productMode: Model<ProductDocument>,
  ) {}

  async findOne(id: string): Promise<ProductDocument> {
    return await this.productMode.findById(id).exec();
  }

  async findAndUpdate(id: string, dto: Product) {
    return await this.productMode
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  async getAll(): Promise<ProductDocument[]> {
    return await this.productMode.find().exec();
  }

  async create(dto: Product): Promise<ProductDocument> {
    const newProduct = new this.productMode(dto);
    return await newProduct.save();
  }

  async delete(id: string): Promise<{ data: boolean }> {
    const data = await this.productMode.findByIdAndDelete(id);
    if (data) {
      return {
        data: true,
      };
    }
  }
}
