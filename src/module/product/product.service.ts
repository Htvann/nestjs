import { Injectable, Param } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./schema/product.schema";
import { Model, Types } from "mongoose";
import { UpdateProductDto } from "./dto/update-product.dto";

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
    return await this.productModel.find().populate("author", "name").exec();
  }

  async update(id: Types.ObjectId, dto: UpdateProductDto) {
    const data = await this.productModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate("author", "name")
      .exec();

    return data;
  }
}
