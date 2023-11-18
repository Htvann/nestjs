import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUserDetail, User, UserDocument } from "./schema/user.schema";
import { Model, Types } from "mongoose";
import { CreateUserDto } from "./dto/user-create.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async _getAllUser(): Promise<IUserDetail[]> {
    return await this.userModel.find().select({ password: 0 });
  }

  async _findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }

  async _getUserDetail(id: Types.ObjectId): Promise<UserDocument> {
    const data = await this.userModel
      .findById(id)
      .select({ password: 0 })
      .exec();
    return data;
  }

  async create(dto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(dto);
    return newUser.save();
  }
}
