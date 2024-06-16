import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { enumRoles, users } from '@prisma/client';
import { Auth } from 'src/decorators/auth.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { ArticlesService } from './articles.service';
import { articleToResponse } from './dto/converter/article-to-response';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @Auth('writer', 'admin')
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @GetUser() user: users,
  ) {
    const result = await this.articlesService.create(user.id, createArticleDto);
    return articleToResponse(result);
  }

  @Get()
  @Auth('writer', 'admin')
  async findAll(@GetUser() user: users) {
    switch (user.role) {
      case enumRoles.admin:
        return (await this.articlesService.findAll()).map((article) =>
          articleToResponse(article),
        );
      case enumRoles.writer:
        return (await this.articlesService.findAllByAuthor(user.id)).map(
          (article) => articleToResponse(article),
        );
    }
  }

  @Get(':id')
  @Auth('writer', 'admin')
  async findOne(@Param('id') id: string, @GetUser() user: users) {
    let result = null;
    switch (user.role) {
      case enumRoles.admin:
        result = await this.articlesService.findOne(id);
        break;
      case enumRoles.writer:
        result = await this.articlesService.findOneByAuthor(id, user.id);
        break;
    }
    if (!result) {
      throw new NotFoundException('Article not found');
    }
    return articleToResponse(result);
  }

  @Patch(':id')
  @Auth('writer', 'admin')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @GetUser() user: users,
  ) {
    let result = null;
    switch (user.role) {
      case enumRoles.admin:
        result = await this.articlesService.update(id, updateArticleDto);
        break;
      case enumRoles.writer:
        result = await this.articlesService.updateByAuthor(
          id,
          user.id,
          updateArticleDto,
        );
        break;
    }
    if (!result) {
      throw new NotFoundException('Article not found');
    }
    return articleToResponse(result);
  }

  @Delete(':id')
  @Auth('writer', 'admin')
  async remove(@Param('id') id: string, @GetUser() user: users) {
    let result = null;
    switch (user.role) {
      case enumRoles.admin:
        result = await this.articlesService.remove(id);
        break;
      case enumRoles.writer:
        result = await this.articlesService.removeByAuthor(id, user.id);
        break;
    }
    if (!result) {
      throw new NotFoundException('Article not found');
    }
    return articleToResponse(result);
  }
}
