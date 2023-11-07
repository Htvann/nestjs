import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/service/base-service';

@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  async checkEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }
}
