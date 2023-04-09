import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard';

@Controller('users')
export class UsersController {
  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@Req() req: Request) {
    return req.user;
  }
}
