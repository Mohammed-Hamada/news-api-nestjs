import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { News } from '../news/news.model';
import { enums } from 'src/core';

@Table({ modelName: 'users' })
export class User extends Model<User> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    values: [enums.Gender.MALE, enums.Gender.FEMALE],
  })
  gender: string;

  @HasMany(() => News)
  news: News[];
}
