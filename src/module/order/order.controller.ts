import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { JwtGuard } from "../auth/guards/jwt.guards";
import { CurrentUserDto, ICurrentUser } from "../auth/dto/user.decorator";
import { Order } from "./schemas/order.schema";

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
    const dto: Order = {
      userId: userId,
      ...createOrderDto,
    };
    return this.orderService.create(dto);
  }
}
