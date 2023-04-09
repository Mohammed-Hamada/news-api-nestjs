import { IsInt, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsInt()
  age: number;
}
