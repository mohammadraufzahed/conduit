import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(user: CreateUserDto) {
    if (!user.email || !user.name || !user.email || !user.password)
      throw new HttpException('Body is not ok', HttpStatus.BAD_REQUEST);
    if (
      await this.prisma.user.count({
        where: {
          username: user.username,
          OR: {
            email: user.email,
          },
        },
      })
    )
      throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
    const password = await bcrypt.hash(user.password, 10);
    return await this.prisma.user.create({
      data: { ...user, password },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (user) return user;
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, user: UpdateUserDto) {
    if (!(await this.prisma.user.count({ where: { id } })))
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return await this.prisma.user.update({
      data: user,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    if (!(await this.prisma.user.count({ where: { id } })))
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return await this.prisma.user.delete({ where: { id } });
  }
}
