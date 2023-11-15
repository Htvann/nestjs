import { Injectable } from "@nestjs/common";
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
    const { userId, product } = createOrderDto;

    const arrProduct = await this.productModel.find({
      _id: { $in: product.map((i) => i.id) },
    });

    console.log(arrProduct);

    // const dto: Order = {
    //   userId: userId,
    //   product: arrProduct,
    // };
    //
    // console.log("dto", dto);

    // const newOrder = new this.orderModel(dto);
    // return await newOrder.save();
  }

  async _detailOrder(id: Types.ObjectId) {
    const data = await this.orderModel.findById(id);
    if (data) {
      return data;
    }
    throw new Error();
  }

  async getAll() {
    return await this.orderModel.find();
  }

  async update({ id, dto }: { id: Types.ObjectId; dto: UpdateOrderDto }) {
    return { id, dto };
  }
}
