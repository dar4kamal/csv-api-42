import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import InsertBatchEvent from './insert-batch.event';
import { RecordsService } from 'src/records/records.service';

@Injectable()
export class EventsService {
  constructor(private recordService: RecordsService) {}

  @OnEvent('insert.batch')
  async insertBatch(event: InsertBatchEvent) {
    const { id, payload } = event;
    console.log(`Starting Batch ${id} => inserting ${payload.length} records`);

    await this.recordService.insertBatches(payload, id);
  }
}
