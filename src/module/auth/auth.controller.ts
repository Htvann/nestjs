import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async signIn(@Body() bodyLogin: AuthLoginDto) {
    return await this.authService.login(bodyLogin);
  }

  @Post('/register')
  async register(@Body() bodyLogin: AuthSignUpDto) {
    return await this.authService.register(bodyLogin);
  }
}
