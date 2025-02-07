import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly useService: UsersService) {}

  @Get()
  async get() {
    return this.useService.findAll();
  }
}
