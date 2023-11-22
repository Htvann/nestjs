import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Author } from "./schema/author.schema";
import { Model, Types } from "mongoose";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { Product } from "../product/schema/product.schema";

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async findAll() {
    return await this.authorModel.find().exec();
  }

  async findById(id: Types.ObjectId) {
    const author = await this.authorModel.findById(id).exec();
    return author;
  }

  async tet(id: Types.ObjectId) {
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
    return await this.authorModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }
}
