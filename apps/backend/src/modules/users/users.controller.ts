import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGaurd } from '../auth/jwt-auth.guard';
import type { Request as eRequest } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(id as unknown as number))
      return this.usersService.findByUsername(id);
    else return this.usersService.findById(+id);
  }

  @UseGuards(JwtAuthGaurd)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: eRequest,
  ) {
    return this.usersService.update(+id, updateUserDto, req.user);
  }

  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: eRequest) {
    return this.usersService.remove(+id, req.user);
  }
}