import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { JwtStrategy } from './strategy';

config();

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '3d',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
