import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UniqueConstraintError } from 'sequelize';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';

import { LoginDto, SignupDto } from './dto';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwt: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await User.findOne({ where: { email: email } });
    if (!user) throw new ForbiddenException('Credentials incorrect.');

    const isPasswordMatches = await verify(user.password, password);
    if (!isPasswordMatches)
      throw new ForbiddenException('Credentials incorrect.');

    return this.signToken(user.id, user.email);
  }

  async signup({ email, password, gender, name }: SignupDto) {
    const hashedPassword = await hash(password);
    try {
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        gender,
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        if (error.errors[0].path === 'email') {
          throw new ForbiddenException('Credentials taken.');
        }
      }
      throw error;
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{
    access_token: string;
    type: string;
  }> {
    const payload = {
      sub: userId,
      email,
    };

    const access_token = await this.jwt.signAsync(payload);

    return {
      access_token,
      type: 'Bearer',
    };
  }
}
