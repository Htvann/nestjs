import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './entities/auth.entity';
import mongoose, { Model } from 'mongoose';
import { AuthSignUpDto } from './dto/signup.dto';
import { checkHashPassword, hashPassword } from 'src/utils/hashing-password';
import { AuthLoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly AuthMode: Model<AuthDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async login(bodyLogin: AuthLoginDto) {
    try {
      const user = await this.AuthMode.findOne({ name: bodyLogin.name });
      if (user) {
        const checkpass = await checkHashPassword(
          bodyLogin.password,
          user.password,
        );
        if (checkpass) {
          const payload = { name: user.name, password: user.password };
          return {
            access_token: await this.jwtService.signAsync(payload),
          };
        }
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw error;
    }
  }

  async register(params: AuthSignUpDto) {
    const { name, password } = params;
    const hash = await hashPassword(password);
    try {
      const user = await this.AuthMode.findOne({ name: params.name });
      if (user) throw new HttpException('CONFLICT', HttpStatus.CONFLICT);
      const data = {
        name: name,
        password: hash,
        _id: new mongoose.Types.ObjectId(),
      };
      return await this.AuthMode.create(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
