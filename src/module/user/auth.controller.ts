import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { checkHashPassword, hashPassword } from 'src/utils/hashing-password';
import { UserService } from './user.service';
import { SigninDto } from './dto/sigin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signin')
  async sigin(@Body() dto: SigninDto) {
    const data = await this.userService.checkEmail(dto.email);
    if (data) {
      const checkPass = await checkHashPassword(dto.password, data.password);
      if (checkPass) {
        return data;
      }
      throw new UnauthorizedException();
    }
    throw new UnauthorizedException();
  }

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    const data = await this.userService.checkEmail(dto.email);
    if (data) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const user: CreateUserDto = {
      email: dto.email,
      name: dto.name,
      password: await hashPassword(dto.password),
    };
    return await this.authService.sigup(user);
  }
}
