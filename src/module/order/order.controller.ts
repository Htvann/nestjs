import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Patch,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { JwtGuard } from "../auth/guards/jwt.guards";
import { CurrentUserDto, ICurrentUser } from "../auth/dto/user.decorator";
import { Types } from "mongoose";
import { UpdateOrderDto } from "./dto/update-order.dto";

@UseGuards(JwtGuard)
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUserDto() user: ICurrentUser,
  ) {
    const userId = user.userId;
    const dto = {
      userId: userId,
      ...createOrderDto,
    };
    return this.orderService.create(dto);
  }

  @Get()
  async getAllOrder() {
    return this.orderService.getAll();
  }

  @Get(":id")
  getOne(@Param("id") id: Types.ObjectId) {
    return this.orderService._detailOrder(id);
  }

  @Patch(":id")
  updateOne(@Param("id") id: Types.ObjectId, @Body() dto: UpdateOrderDto) {
    return this.orderService.update({ id: id, dto: dto });
  }
}
