import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './news.model';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News) private newsModel: typeof News) {}

  async create() {
    await 'hello';
  }
}
