import {
  Length,
  Validate,
  IsOptional,
  IsNotEmpty,
  IsUppercase,
} from 'class-validator';
import {
  IsStringStartsWith,
  IsCustomNumberString,
} from '../validation/custom-validators';
import { COUNTRY_CODE_LENGTH, SEX_CODE_LENGTH, YEAR_LENGTH } from './constants';

export default class FilterRecordsDTO {
  @IsOptional()
  @IsNotEmpty({ message: "country code can't be empty" })
  @IsUppercase({ message: 'country code must be uppercase letters' })
  @Length(COUNTRY_CODE_LENGTH, COUNTRY_CODE_LENGTH, {
    message: `country code must be exactly ${COUNTRY_CODE_LENGTH} characters`,
  })
  country: string;

  @IsOptional()
  @Validate(IsStringStartsWith, ['SEX_'])
  @IsNotEmpty({ message: "sex code can't be empty" })
  @IsUppercase({ message: 'sex code must be uppercase letters' })
  @Length(SEX_CODE_LENGTH, SEX_CODE_LENGTH, {
    message: `country code must be exactly ${SEX_CODE_LENGTH} characters`,
  })
  sex: string;

  @IsOptional()
  @Validate(IsCustomNumberString, { message: 'year must be valid number' })
  @Length(YEAR_LENGTH, YEAR_LENGTH, {
    message: `year must be exactly ${YEAR_LENGTH} digits`,
  })
  year: number;

  @IsOptional()
  @IsNotEmpty({ message: "age group can't be empty" })
  @IsUppercase({ message: 'age group must be uppercase letters' })
  @Validate(IsStringStartsWith, ['AGE_'], {
    message: `age group code must start with 'AGE_'`,
  })
  ageGroup: string;
}
