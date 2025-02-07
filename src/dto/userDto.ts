export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly gender?: string;
  readonly dateOfBirth?: Date;
}

export class SignInDto {
  readonly email: string;
  readonly password: string;
}
