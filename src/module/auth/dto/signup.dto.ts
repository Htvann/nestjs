import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
