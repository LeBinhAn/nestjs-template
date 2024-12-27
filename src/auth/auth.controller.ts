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
    return this.authService.signIn(request.userName, request.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
