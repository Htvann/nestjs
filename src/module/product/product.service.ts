import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./schema/product.schema";
import { Model } from "mongoose";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>
  ) {}
  async create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    return await newProduct.save();
  }
  async findAll() {
    return await this.productModel.find().exec();
  }
}
