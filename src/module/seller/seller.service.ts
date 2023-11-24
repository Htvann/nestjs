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
    private readonly productService: ProductService,
  ) {}

  async create(createSellerDto: CreateSellerDto) {
    try {
      await this.productService.findMany(
        createSellerDto.products.map((i) => new Types.ObjectId(i._id)),
      );
      const dto = {
        name: createSellerDto.name,
        total_revenue: 0,
        products: createSellerDto.products.map((i) => ({
          product: new Types.ObjectId(i._id),
          quantity_sold: 0,
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
    try {
      const data = await this.sellerModel
        .find()
        .populate({ path: "products", populate: "_id" });
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }

  async userOrder(id: string, dto: { id: string; amount: number }[]) {
    const item = await this.sellerModel
      .findById(new Types.ObjectId(id))
      .then((res) => {
        // const newProduct = res.products.map((item) => {
        //   return {
        //     total_product: item.total_product,
        //     product: item.product,
        //     quantity_sold:
        //       item.quantity_sold +
        //         dto.find((i) => i.id === item.product.toString())?.amount || 0,
        //   };
        // });
        // res.products = newProduct;
        return res.save();
      });

    return item;
  }
}
