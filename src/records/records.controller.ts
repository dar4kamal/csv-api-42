import { Controller, Get } from '@nestjs/common';

import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private recordService: RecordsService) {}

  @Get('latest')
  getLatestYearRecords() {
    return this.recordService.getLatestYearRecords();
  }
}
