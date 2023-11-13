import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUserDetail, User, UserDocument } from "./schema/user.schema";
import { Model, ObjectId } from "mongoose";
import { CreateUserDto } from "./dto/user-create.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async _getAllUser(): Promise<IUserDetail[]> {
    return await this.userModel.find();
  }

  async _findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }

  async _getUserDetail(id: ObjectId): Promise<IUserDetail> {
    const data = await this.userModel.findById(id).exec();
    return {
      _id: data._id,
      name: data.name,
      email: data.email,
    };
  }

  async create(dto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(dto);
    return newUser.save();
  }
}
