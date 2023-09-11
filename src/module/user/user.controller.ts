import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return await this.userService.create(createUserDto);
  // }

  @Get()
  async findAll() {
    return await this.userService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  //
  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return await this.userService.update(id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }
}
