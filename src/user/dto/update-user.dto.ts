import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  age: string;

  @IsNotEmpty()
  address: string;
}
