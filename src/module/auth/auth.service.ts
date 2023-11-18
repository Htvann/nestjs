import { ConflictException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/user-create.dto";
import { checkHashPassword, hashPassword } from "src/utils/hashing-password";
import { ILogin } from "./dto/signin.dto";
import { JwtService } from "@nestjs/jwt";
import { Types } from "mongoose";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async register(dto: Readonly<CreateUserDto>) {
    const user = await this.userService._findByEmail(dto.email);
    if (user) {
      throw new ConflictException("User already exist");
    }
    const hash = await hashPassword(dto.password);
    const newUser: CreateUserDto = {
      email: dto.email,
      name: dto.name,
      password: hash,
    };
    return await this.userService.create(newUser);
  }
  async doestPasswordMatch(dto: ILogin) {
    const user = await this.userService._findByEmail(dto.email);
    if (user) {
      const check = await checkHashPassword(dto.password, user.password);
      if (check) {
        return user;
      }
    }
    return null;
  }

  async generateJwt(id: Types.ObjectId) {
    return await this.jwtService.signAsync({ id });
  }

  async login({ id }: { id: Types.ObjectId }) {
    return {
      data: await this.userService._getUserDetail(id),
      jwt: await this.generateJwt(id),
    };
  }
}
