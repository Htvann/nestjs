import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import mongoose, { mongo } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async list() {
    return await this.userService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @Post('')
  async create(@Body() dto: CreateUserDto) {
    const data = { ...dto, _id: new mongoose.Types.ObjectId() };
    return await this.userService.insertOne(data);
  }
  @Patch(':id')
  async update(@Param('id') id: mongo.ObjectId, @Body() dto: UpdateUserDto) {
    return await this.userService.findByIdAndUpdate(id, dto, { new: true });
  }

  @Delete(':id')
  async delete(@Param('id') id: mongo.ObjectId) {
    return await this.userService.deleteOne(id);
  }
}
