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
    return await this.sellerModel.find().populate({
      path: "products",
      populate: "product",
    });
  }

  async userOrder(id: string, dto: { id: string; amount: number }[]) {
    try {
      const listProduct = await this.productServie.findMany(
        dto.map((i) => new Types.ObjectId(i.id)),
      );

      await this.sellerModel.findById(new Types.ObjectId(id)).then((res) => {
        const newProduct = res.products.map((item) => ({
          total_product: item.total_product,
          product: item.product,
          quantity_sold:
            item.quantity_sold +
              dto.find((i) => i.id === item.product.toString()).amount ?? 0,
        }));

        const sum = listProduct.reduce(
          (
            total: number,
            currentValue: { _id: Types.ObjectId; price: number },
          ) => {
            console.log(
              newProduct.find(
                (i) => i.product.toString() === currentValue._id.toString(),
              ),
            );
            return (
              total +
              currentValue.price *
                newProduct.find(
                  (i) => i.product.toString() === currentValue._id.toString(),
                ).quantity_sold
            );
          },
          0,
        );

        res.total_revenue = sum;
        res.products = newProduct;
        return res.save();
      });
    } catch (error) {
      console.log("error", error);
    }
  }
}
