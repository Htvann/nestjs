import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Author } from "./schema/author.schema";
import { Model, Types } from "mongoose";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>
  ) {}

  async findAll() {
    return await this.authorModel.find().populate("products").exec();
  }

  async findById(id: Types.ObjectId) {
    return await this.authorModel.findById(id).populate("products").exec();
  }

  async create(dto: CreateAuthorDto) {
    const newDto: CreateAuthorDto = {
      ...dto,
      products: dto.products.map((i) => new Types.ObjectId(i)),
    };
    const newAuthor = new this.authorModel(newDto);
    return await newAuthor.save();
  }

  async update(id: Types.ObjectId, dto: UpdateAuthorDto) {
    return await this.authorModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate("products", "name")
      .exec();
  }
}
