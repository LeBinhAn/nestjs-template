import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from 'src/dto/userDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  getHealthCheck(): string {
    return this.authService.healthCheck();
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() request: SignInDto) {
    return this.authService.signIn(request.email, request.password);
  }

  @Post('sign-up')
  signUp(@Body() request: CreateUserDto) {
    return this.authService.signUp(request);
  }
}
