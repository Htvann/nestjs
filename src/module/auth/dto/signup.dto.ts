import { IsNotEmpty } from 'class-validator';

export class AuthSignUpDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
