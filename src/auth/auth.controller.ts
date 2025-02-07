import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/dto/createUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  getHealthCheck(): string {
    return this.authService.healthCheck();
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() request: Record<string, string>) {
    return this.authService.signIn(request.email, request.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('sign-up')
  signUp(@Body() request: CreateUserDto) {
    return this.authService.signUp(request);
  }
}
