import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  healthCheck() {
    const status: string = 'good';
    return `Module Auth Service is ${status}'`;
  }

  signIn(userName: string, password: string): Promise<any> {
    const user = this.userService.findOne(userName, password);

    if (user === undefined) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
