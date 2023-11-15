import { Controller, Post, Body, UseGuards, Get } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { JwtGuard } from "../auth/guards/jwt.guards";
import { CurrentUserDto, ICurrentUser } from "../auth/dto/user.decorator";

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

  // @Get()
  // getByUser(id: Types.ObjectId) {
  //   return this.orderService.getAll();
  // }
}
