import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./schema/product.schema";
import { Model, Types } from "mongoose";
import { UpdateProductDto } from "./dto/update-product.dto";
import { AuthorService } from "../author/author.service";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly authorService: AuthorService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    return await newProduct.save();
  }

  async findAll() {
    return await this.productModel.find().populate("author", "name").exec();
  }

  async findMany(id?: Types.ObjectId[]) {
    return await this.productModel
      .find({
        _id: {
          $in: id,
        },
      })
      .populate("author", "name")
      .exec();
  }

  async findOne(id: Types.ObjectId) {
    return await this.productModel.findById(id);
  }

  async update(id: Types.ObjectId, dto: UpdateProductDto) {
    const res = await this.productModel.findById(id);

    if (dto.original_price) {
      if (dto.original_price < res.discount) {
        throw new Error("new origin price < discount");
      }
    }

    if (dto.discount) {
      if (dto.discount > res.original_price) {
        throw new Error("new discount > origin price");
      }
    }

    if (dto.original_price && dto.discount) {
      if (dto.discount > dto.original_price) {
        throw new Error("new discount > new origin price");
      }
    }

    res.name = dto.name ?? res.name;
    res.primary_category_name =
      dto.primary_category_name ?? res.primary_category_name;
    res.original_price = dto.original_price ?? res.original_price;
    res.discount = dto.discount ?? res.discount;

    res.author =
      (await this.authorService.findById(dto.author)) ??
      (await this.authorService.findById(res.author));

    return await res.save();
  }
}
