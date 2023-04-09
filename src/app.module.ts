import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { config } from 'dotenv';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/user.model';
import { NewsModule } from './modules/news/news.module';
import { News } from './modules/news/news.model';

config();

const sequelizeConfig = {
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_DEVELOPMENT,
  models: [User, News],
  synchronize: true,
  define: {
    defaultScope: {
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
    },
  },
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      useFactory: () => sequelizeConfig,
    }),
    UsersModule,
    AuthModule,
    NewsModule,
  ],
})
export class AppModule {}
