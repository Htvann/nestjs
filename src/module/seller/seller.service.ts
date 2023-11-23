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
    try {
      const list = await this.sellerModel.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "products.product",
            foreignField: "_id",
            as: "productsData",
          },
        },
        {
          $unwind: "$products",
        },
        {
          $addFields: {
            "products.productDetails": {
              $filter: {
                input: "$productsData",
                as: "prod",
                cond: { $eq: ["$$prod._id", "$products.product"] },
              },
            },
          },
        },
        {
          $addFields: {
            "products.sum": {
              $multiply: [
                { $arrayElemAt: ["$products.productDetails.price", 0] },
                "$products.quantity_sold",
              ],
            },
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            products: {
              $push: {
                product: { $arrayElemAt: ["$products.productDetails", 0] },
                total_product: "$products.total_product",
                quantity_sold: "$products.quantity_sold",
              },
            },
            totalSum: { $sum: "$products.sum" },
          },
        },
      ]);
      return list;
    } catch (error) {}
  }

  async userOrder(id: string, dto: { id: string; amount: number }[]) {
    try {
      await this.sellerModel.findById(new Types.ObjectId(id)).then((res) => {
        const newProduct = res.products.map((item) => {
          return {
            total_product: item.total_product,
            product: item.product,
            quantity_sold:
              item.quantity_sold +
                dto.find((i) => i.id === item.product.toString())?.amount || 0,
          };
        });

        res.products = newProduct;
        return res.save();
      });
    } catch (error) {
      console.log("error", error);
    }
  }
}
