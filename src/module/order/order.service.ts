import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "./schemas/order.schema";
import { Model } from "mongoose";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}
  async create(createOrderDto: Order) {
    return await this.orderModel.create(createOrderDto);
  }
}
