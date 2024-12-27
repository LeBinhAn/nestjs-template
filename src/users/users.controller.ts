import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/createUserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly useService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.useService.create(createUserDto);
  }

  @Get()
  async get() {
    return this.useService.findAll();
  }
}
