import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/users/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectModel(User) private userService: typeof User,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { email: string; sub: number }) {
    const user = this.userService.findByPk(payload.sub, {
      attributes: {
        exclude: ['password'],
        include: ['createdAt', 'updatedAt'],
      },
    });

    return user;
  }
}
