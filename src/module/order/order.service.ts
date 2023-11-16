import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order, OrderDocument } from "./schemas/order.schema";
import { Model, Types } from "mongoose";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Product, ProductDocument } from "../product/schema/product.schema";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,

    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto & { userId: Types.ObjectId }) {
    const { userId, products } = createOrderDto;

    try {
      const arrProduct = await this.productModel.find({
        _id: { $in: products.map((i) => i.id) },
      });
      if (arrProduct) {
        const dto: Order = {
          userId: userId,
          products: products,
        };
        const newOrder = new this.orderModel(dto);
        return await newOrder.save();
      }
    } catch (error) {
      console.log("error", error);
      throw new HttpException("No product", HttpStatus.NOT_FOUND);
    }
  }

  async _detailOrder(id: Types.ObjectId) {
    let arr = [];
    const data = await this.orderModel.findById(id);

    try {
      const arrProduct = await this.productModel.find({
        _id: { $in: data.products.map((i) => i.id) },
      });
    } catch (error) {
      throw new HttpException("No order", HttpStatus.NOT_FOUND);
    }
  }

  async getAll() {
    return await this.orderModel.find();
  }

  async update({ id, dto }: { id: Types.ObjectId; dto: UpdateOrderDto }) {
    return { id, dto };
  }
}
