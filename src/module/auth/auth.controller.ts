import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthLoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  signIn(@Body() bodyLogin: AuthLoginDto): { signIn: AuthLoginDto } {
    return { signIn: bodyLogin };
  }

  @Post('/signup')
  signUp(@Body() bodyLogin: AuthLoginDto): AuthLoginDto {
    return bodyLogin;
  }
}
