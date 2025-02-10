import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { IsEmailIfExists } from 'src/utils/validators';

export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly gender?: string;
  readonly dateOfBirth?: Date;
}

export class SignInDto {
  @IsDefined({ message: 'Email is required.' })
  @IsEmailIfExists()
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @IsString()
  password: string;
}
