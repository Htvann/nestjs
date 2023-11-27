import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  Inject,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Types } from "mongoose";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Controller("product")
export class ProductController {
  constructor(
    private readonly productService: ProductService,

    @Inject(CACHE_MANAGER)
    private cacheManage: Cache,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // @UseInterceptors(CacheInterceptor)
  @Get("no")
  findAll() {
    return this.productService.findAll();
  }

  @Patch(":id")
  async update(@Param("id") id: Types.ObjectId, @Body() dto: UpdateProductDto) {
    return await this.productService.update(id, dto);
  }

  @Get()
  async getCache() {
    const val = await this.cacheManage.get("list");
    if (val) {
      return {
        data: val,
        message: "this is loader from redis cache",
      };
    } else {
      const data = this.productService.findAll();
      await this.cacheManage.set("list", data, 1000);
      return data;
    }
  }
}
