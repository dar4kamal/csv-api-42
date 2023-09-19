import { Controller, Get, Param } from '@nestjs/common';

import { RecordsService } from './records.service';
import FindByCountryDTO from './dto/find-by-country.dto';

@Controller()
export class RecordsController {
  constructor(private recordService: RecordsService) {}

  @Get('latest-records')
  getLatestYearRecords() {
    return this.recordService.getLatestYearRecords();
  }

  @Get('countries/:country')
  getCountryRecords(@Param() params: FindByCountryDTO) {
    return this.recordService.getCountryRecords(params);
  }
}
