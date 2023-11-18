import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { CreateAuthorDto } from "./dto/create-author.dto";

@Controller("author")
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.authorService.findById(id);
  }

  @Post()
  async createAuthor(@Body() dto: CreateAuthorDto) {
    return this.authorService.create(dto);
  }
}
