import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import InsertBatchEvent from './insert-batch.event';

@Injectable()
export class EventsService {
  @OnEvent('insert.batch')
  async insertBatch(event: InsertBatchEvent) {
    const { id, payload } = event;
    console.log(`Starting Batch ${id} => inserting ${payload.length} records`);
  }
}
