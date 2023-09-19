import {
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsCustomNumberString', async: false })
export class IsCustomNumberString implements ValidatorConstraintInterface {
  validate(text: string) {
    return !isNaN(+text);
  }
}

@ValidatorConstraint({ name: 'IsStringStartsWith', async: false })
export class IsStringStartsWith implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const {
      constraints: [value],
    } = args;
    return text.startsWith(value);
  }

  defaultMessage(args: ValidationArguments) {
    const {
      property,
      constraints: [value],
    } = args;
    return `${property} code must start with ${value}`;
  }
}
