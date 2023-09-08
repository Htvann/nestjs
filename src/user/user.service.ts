import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return `This action adds a new user + ${createUserDto}`;
  }
  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<User> {
    // console.log('data', await this.model.findById(id).exec());
    return await this.model.findById(id).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return JSON.stringify(updateUserDto);
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
