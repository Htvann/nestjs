import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { Seller } from "./schema/seller.shema";
import { Model, Types } from "mongoose";

@Injectable()
export class SellerService {
  constructor(@InjectModel(Seller.name) private sellerModel: Model<Seller>) {}
  async create(createSellerDto: CreateSellerDto) {
    const dto: CreateSellerDto = {
      ...createSellerDto,
      products: createSellerDto.products.map((i) => ({
        _id: new Types.ObjectId(i._id),
        total_product: i.total_product,
      })),
    };
    const newSeller = new this.sellerModel(dto);
    return await newSeller.save();
  }
  async findAll() {
    return await this.sellerModel.find();
  }
}
