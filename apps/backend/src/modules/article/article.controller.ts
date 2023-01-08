import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import type { Request as eRequest } from 'express';
import { JwtAuthGaurd } from '../auth/jwt-auth.guard';
import { ArticleService } from './article.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async getAll() {
    return await this.articleService.findMany();
  }

  @Get(':slug')
  async get(@Param('slug') slug: string) {
    return await this.articleService.find(slug);
  }

  @Post()
  @UseGuards(JwtAuthGaurd)
  async create(@Body() body: CreatePostDTO, @Request() req: eRequest) {
    if (!body.title || !body.slug || !body.subject || !body.tags || !body.body)
      throw new HttpException('Body is missing', HttpStatus.BAD_REQUEST);
    return await this.articleService.create(body, (req.user as any).username);
  }

  @Patch(':slug')
  @UseGuards(JwtAuthGaurd)
  async update(
    @Param('slug') slug: string,
    @Body() body: UpdatePostDTO,
    @Request() req: eRequest,
  ) {
    return await this.articleService.update(
      body,
      slug,
      (req.user as any).username,
    );
  }

  @Delete(':slug')
  @UseGuards(JwtAuthGaurd)
  async delete(@Param('slug') slug: string, @Request() req: eRequest) {
    return await this.articleService.delete(slug, (req.user as any).username);
  }
}
