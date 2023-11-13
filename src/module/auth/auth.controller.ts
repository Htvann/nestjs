import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/user-create.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  async create(@Body() dto: CreateUserDto) {
    return await this.authService.register(dto);
  }

  @Post("/login")
  async login(@Body() dto: CreateUserDto) {
    const data = await this.authService.doestPasswordMatch(dto);
    if (data) {
      return await this.authService.login({ email: dto.email });
    }
  }
}
