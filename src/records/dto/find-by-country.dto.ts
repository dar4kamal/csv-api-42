import { IsNotEmpty, IsUppercase, Length } from 'class-validator';

import { COUNTRY_CODE_LENGTH } from './constants';

export default class FindByCountryDTO {
  @IsNotEmpty({ message: "country code can't be empty" })
  @IsUppercase({ message: 'country code must be uppercase letters' })
  @Length(COUNTRY_CODE_LENGTH, COUNTRY_CODE_LENGTH, {
    message: `country code must be ${COUNTRY_CODE_LENGTH} exactly characters`,
  })
  country: string;
}
