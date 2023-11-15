import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order, OrderDocument } from "./schemas/order.schema";
import { Model, Types } from "mongoose";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Product, ProductDocument } from "../product/schema/product.schema";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,

    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}
  async create(createOrderDto: CreateOrderDto & { userId: Types.ObjectId }) {
    const { userId, product } = createOrderDto;
    const arrProduct = await this.productModel.find({ _id: { $in: product } });

    const dto: Order = {
      userId: userId,
      product: arrProduct,
    };
    const newOrder = new this.orderModel(dto);
    return newOrder.save();
  }

  async getAll() {
    return await this.orderModel.find();
  }
}