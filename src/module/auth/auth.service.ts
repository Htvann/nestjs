import { ConflictException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/user-create.dto";
import { checkHashPassword, hashPassword } from "src/utils/hashing-password";
import { ILogin } from "./dto/signin.dto";
import { JwtService } from "@nestjs/jwt";

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
      return await checkHashPassword(dto.password, user.password);
    }
  }

  async generateJwt({ email }: { email: string }) {
    return await this.jwtService.signAsync({ email });
  }

  async login({ email }: { email: string }) {
    return {
      jwt: await this.generateJwt({ email: email }),
    };
  }
}
