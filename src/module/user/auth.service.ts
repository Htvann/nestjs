import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schemas';
import { Model, mongo } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { Base_Response } from 'src/utils/base-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async sigup(dto: CreateUserDto) {
    const user = {
      ...dto,
      _id: new mongo.ObjectId(),
    };
    const data = await this.userModel.create(user);
    if (data) {
      return new Base_Response({
        status: 200,
        success: true,
        data: data,
      });
    }
  }
}
