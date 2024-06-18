import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces/IUser';

@Injectable()
export class UsersService {
  findOne(userName: string, password: string): Promise<IUser | undefined> {
    if (userName === 'admin' && password === 'admin') {
      return Promise.resolve({ name: userName, password: password } as IUser);
    }

    return undefined;
  }
}
