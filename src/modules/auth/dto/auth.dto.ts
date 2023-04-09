import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsStrongPassword()
  @IsNotEmpty({})
  readonly password: string;
}

export class LoginDto extends AuthDto {}

export class SignupDto extends AuthDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsEnum(Gender)
  readonly gender: string;
}
