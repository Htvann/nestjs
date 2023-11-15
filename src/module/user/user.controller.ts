import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "../auth/guards/jwt.guards";
import { CurrentUserDto, ICurrentUser } from "../auth/dto/user.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService._getAllUser();
  }

  @UseGuards(JwtGuard)
  @Get("profile")
  async getUserId(@CurrentUserDto() user: ICurrentUser) {
    return await this.userService._getUserDetail(user.userId);
  }
}
