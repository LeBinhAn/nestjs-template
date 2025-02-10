import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsEmailIfExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isEmailIfExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          // If value doesn't exist, skip validation
          if (value === undefined) {
            return true;
          }
          // If value exists, check if it's a valid email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return typeof value === 'string' && emailRegex.test(value);
        },
        defaultMessage() {
          return 'Invalid email format';
        },
      },
    });
  };
}
