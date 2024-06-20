import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  healthCheck() {
    const status: string = 'good';
    return `Module Auth Service is ${status}'`;
  }

  async signIn(userName: string, password: string): Promise<any> {
    const user = await this.userService.findOne(userName, password);

    if (user === undefined) {
      throw new UnauthorizedException();
    }

    const payload = {
      userName: user.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
