import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { EventsService } from './events.service';
import { RecordsModule } from 'src/records/records.module';

@Module({
  imports: [EventEmitterModule.forRoot(), RecordsModule],
  providers: [EventsService],
})
export class EventsModule {}
