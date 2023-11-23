import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Author } from "./schema/author.schema";
import { Model, Types } from "mongoose";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async findAll() {
    const data = await this.authorModel.find().exec();
    return { total: data.length, items: data };
  }

  async findById(id: Types.ObjectId) {
    const data = await this.authorModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "author",
          as: "products",
        },
      },
      { $project: { "products.author": 0 } },
    ]);
    return data[0];
  }

  async create(dto: CreateAuthorDto) {
    const newAuthor = new this.authorModel(dto);
    return await newAuthor.save();
  }

  async update(id: Types.ObjectId, dto: UpdateAuthorDto) {
    const data = await this.authorModel.findById(id);
    if (data) {
      data.name = dto.name ?? data.name;
      return data.save();
    }
    throw new Error("something went wrong");
  }
}
