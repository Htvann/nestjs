import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { Types } from "mongoose";
import { UpdateAuthorDto } from "./dto/update-author.dto";

@Controller("author")
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: Types.ObjectId) {
    return this.authorService.findById(id);
  }

  @Post()
  async createAuthor(@Body() dto: CreateAuthorDto) {
    return this.authorService.create(dto);
  }

  @Patch(":id")
  async update(@Param("id") id: Types.ObjectId, @Body() dto: UpdateAuthorDto) {
    return this.authorService.update(id, dto);
  }
}
