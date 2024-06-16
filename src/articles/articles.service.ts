import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './schema/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  create(userId: number, createArticleDto: CreateArticleDto) {
    const createdArticle = new this.articleModel({
      ...createArticleDto,
      author: userId,
    });
    return createdArticle.save();
  }

  findAll() {
    return this.articleModel.find().exec();
  }

  findAllByAuthor(userId: number) {
    return this.articleModel.find({ author: userId }).exec();
  }

  findOne(id: string) {
    return this.articleModel.findOne({ _id: id }).exec();
  }

  findOneByAuthor(id: string, userId: number) {
    return this.articleModel.findOne({ _id: id, author: userId }).exec();
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.articleModel
      .findOneAndUpdate({ _id: id }, updateArticleDto)
      .exec();
  }

  async updateByAuthor(
    id: string,
    userId: number,
    updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleModel
      .findOneAndUpdate({ _id: id, author: userId }, updateArticleDto)
      .exec();
  }

  remove(id: string) {
    return this.articleModel.findOneAndDelete({ _id: id }).exec();
  }

  removeByAuthor(id: string, userId: number) {
    return this.articleModel
      .findOneAndDelete({ _id: id, author: userId })
      .exec();
  }
}
