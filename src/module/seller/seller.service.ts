import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { Seller } from "./schema/seller.shema";
import { Model, Types } from "mongoose";
import { ProductService } from "../product/product.service";

@Injectable()
export class SellerService {
  constructor(
    @InjectModel(Seller.name) private sellerModel: Model<Seller>,
    private readonly productServie: ProductService,
  ) {}

  async create(createSellerDto: CreateSellerDto) {
    try {
      await this.productServie.findMany(
        createSellerDto.products.map((i) => i._id),
      );
      const dto = {
        ...createSellerDto,
        products: createSellerDto.products.map((i) => ({
          product: new Types.ObjectId(i._id),
          total_product: i.total_product,
        })),
      };
      const newSeller = new this.sellerModel(dto);
      return await newSeller.save();
    } catch (error) {
      throw new Error("something went wrrong!");
    }
  }

  async findAll() {
    return await this.sellerModel.find().populate({
      path: "products",
      populate: "product",
    });
  }
}
