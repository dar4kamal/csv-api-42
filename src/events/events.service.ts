import { Cache } from 'cache-manager';
import { OnEvent } from '@nestjs/event-emitter';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import InsertBatchEvent from './insert-batch.event';
import { RecordsService } from 'src/records/records.service';

@Injectable()
export class EventsService {
  constructor(
    private recordService: RecordsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @OnEvent('insert.batch')
  async insertBatch(event: InsertBatchEvent) {
    const { id, payload } = event;
    console.log(`Starting Batch ${id} => inserting ${payload.length} records`);

    await this.recordService.insertBatches(payload, id);
  }

  @OnEvent('cache.batch')
  async cacheBatches(event: InsertBatchEvent) {
    const { payload, id } = event;

    console.log(`Caching Batch ${id} => caching ${payload.length} records`);

    console.time(`Caching Batch ${id} took`);
    await this.cacheManager.set(`batch-${id}`, payload);
    console.timeEnd(`Caching Batch ${id} took`);
  }
}
