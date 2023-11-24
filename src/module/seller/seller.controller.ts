import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { SellerService } from "./seller.service";
import { CreateSellerDto } from "./dto/create-seller.dto";

@Controller("seller")
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.create(createSellerDto);
  }

  @Get()
  findAll() {
    return this.sellerService.findAll();
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: { id: string; amount: number }[],
  ) {
    return this.sellerService.userOrder(id, dto);
  }
}
