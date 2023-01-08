import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UpdatePostDTO } from './dto/update-post.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: {
      title: string;
      slug: string;
      body: string;
      subject: string;
      tags: string[];
    },
    username: string,
  ) {
    if (await this.prisma.article.count({ where: { slug: data.slug } }))
      throw new HttpException('Slug is duplicate', HttpStatus.BAD_REQUEST);
    return await this.prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        body: data.body,
        subject: data.subject,
        tags: data.tags,
        author: {
          connect: {
            username,
          },
        },
      },
    });
  }
  async find(slug: string) {
    const article = await this.prisma.article.findFirst({
      where: { slug },
    });
    if (!article)
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    return article;
  }

  async findMany() {
    return await this.prisma.article.findMany();
  }

  async update(data: UpdatePostDTO, slug: string, username: string) {
    if (
      !(await this.prisma.article.count({
        where: { slug, author: { username } },
      }))
    )
      throw new HttpException(
        "Article not found or user doesn't have permission",
        HttpStatus.NOT_FOUND,
      );
    return await this.prisma.article.update({
      data: {
        title: data.title,
        subject: data.subject,
        body: data.body,
        tags: data.tags,
      },
      where: {
        slug,
      },
    });
  }

  async delete(slug: string, username: string) {
    if (
      !(await this.prisma.article.count({
        where: { slug, author: { username } },
      }))
    )
      throw new HttpException(
        "Article not found or user doesn't have permission",
        HttpStatus.NOT_FOUND,
      );
    return await this.prisma.article.delete({ where: { slug } });
  }
}
