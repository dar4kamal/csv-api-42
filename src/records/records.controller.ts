import { Controller, Get, Param, Query } from '@nestjs/common';

import { RecordsService } from './records.service';
import FilterRecordsDTO from './dto/filter-records.dto';
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

  @Get('records')
  getAllRecords(@Query() queryParams: FilterRecordsDTO) {
    return this.recordService.getAllRecords(queryParams);
  }
}
