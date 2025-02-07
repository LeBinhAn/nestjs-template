import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/interfaces/IUser';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

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

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (user === undefined || user === null) {
      throw new UnauthorizedException();
    }

    const isPasswordMatch = await bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      name: user.name,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(params: IUser): Promise<any> {
    const user = await this.userService.create(params);

    const payload = {
      userName: user.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
