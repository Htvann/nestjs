import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { Seller } from "./schema/seller.shema";
import { Model, Types } from "mongoose";

@Injectable()
export class SellerService {
  constructor(
    @InjectModel(Seller.name) private readonly sellerModel: Model<Seller>
  ) {}
  async create(createSellerDto: CreateSellerDto) {
    const dto: CreateSellerDto = {
      ...createSellerDto,
      products: createSellerDto.products.map((i) => new Types.ObjectId(i)),
    };
    const newSeller = new this.sellerModel(dto);
    return await newSeller.save();
  }
  async findAll() {
    return await this.sellerModel.find();
  }
}
