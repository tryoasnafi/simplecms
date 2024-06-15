import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth('admin')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    delete user.password;
    return user;
  }

  @Get()
  @Auth('admin')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth('admin')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(+id);
    delete user.password;
    return user;
  }

  @Patch(':id')
  @Auth('admin')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);
    delete user.password;
    return user;
  }

  @Delete(':id')
  @Auth('admin')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(+id);
    delete user.password;
    return user;
  }
}
