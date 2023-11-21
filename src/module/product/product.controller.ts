import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Types } from "mongoose";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Patch(":id")
  async update(@Param("id") id: Types.ObjectId, @Body() dto: UpdateProductDto) {
    return await this.productService.update(id, dto);
  }
}
