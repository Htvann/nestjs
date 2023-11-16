import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { JwtGuard } from "../auth/guards/jwt.guards";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller("product")
@UseGuards(JwtGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll() {
    return await this.productService.getAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const data = await this.productService.findOne(id);
    if (data) {
      return data;
    }
    throw new NotFoundException();
  }

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    const product = await this.productService.findAlias(dto.alias);

    if (product.length) {
      throw new Error();
    }

    return await this.productService.create({
      name: dto.name,
      total: dto.total,
      price: dto.price,
      alias: dto.alias,
    });
  }

  @Delete()
  async delete(@Body("id") id: string) {
    return await this.productService.delete(id);
  }
}
