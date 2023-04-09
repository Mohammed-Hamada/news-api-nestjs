import {
  Column,
  DataType,
  Table,
  BelongsTo,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { constants } from 'src/core';

@Table({ modelName: 'news' })
export class News extends Model<News> {
  @Column({
    type: DataType.STRING(constants.NEWS_OPTIONS.titleLength),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING(constants.NEWS_OPTIONS.slugLength),
    allowNull: false,
  })
  slug: string;

  @Column({
    type: DataType.STRING(constants.NEWS_OPTIONS.summaryLength),
    allowNull: false,
  })
  summary: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true, allowNull: false })
  published: boolean;

  @Column({ type: DataType.DATE, allowNull: true })
  publishedAt: Date;

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
