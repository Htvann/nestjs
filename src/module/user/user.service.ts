import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'src/common/service/base-service';

@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly UserMode: Model<UserDocument>,
  ) {
    super(UserMode);
  }

  // async findOne(id: string): Promise<User> {
  //   return await this.UserMode.findById(id).exec();
  // }
}
