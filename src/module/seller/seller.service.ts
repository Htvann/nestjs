import { Injectable } from "@nestjs/common";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Seller } from "./schema/seller.shema";
import { Model } from "mongoose";

@Injectable()
export class SellerService {
  constructor(
    @InjectModel(Seller.name) private readonly sellerModel: Model<Seller>
  ) {}
  create(createSellerDto: CreateSellerDto) {
    return "This action adds a new seller";
  }
  async findAll() {
    return await this.sellerModel.find();
  }
}
