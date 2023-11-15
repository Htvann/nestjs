import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./schema/product.schema";
import { JwtGuard } from "../auth/guards/jwt.guards";

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
    return await this.productService.findOne(id);
  }

  @Patch(":id")
  async findAndUpdate(
    @Param("id") id: string,
    @Body("name") name: string,
    @Body("total") total: number,
    @Body("description") description: string,
  ) {
    const item = await this.productService.findOne(id);
    if (item) {
      const newDto = new Product();
      newDto.name = name ?? item.name;
      newDto.total = total ?? item.total;
      newDto.description = description ?? item.description;
      return await this.productService.findAndUpdate(id, newDto);
    }
  }

  @Post()
  async createProduct(
    @Body("name") name: string,
    @Body("total") total: number,
    @Body("description") description: string,
  ) {
    return await this.productService.create({
      name: name,
      total: total,
      description: description,
    });
  }

  @Delete()
  async delete(@Body("id") id: string) {
    return await this.productService.delete(id);
  }
}
