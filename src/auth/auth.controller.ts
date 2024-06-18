import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  getHealthCheck(): string {
    return this.authService.healthCheck();
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() request: Record<string, string>) {
    return this.authService.signIn(request.userName, request.password);
  }
}
