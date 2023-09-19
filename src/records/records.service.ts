import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { Record } from './record.schema';

@Injectable()
export class RecordsService {
  constructor(@InjectModel(Record.name) private recordModel: Model<Record>) {}

  async insertBatches(batch: Record[], batchIdx: number) {
    try {
      console.time(`Batch ${batchIdx} took`);
      await this.recordModel.insertMany(batch);
      console.timeEnd(`Batch ${batchIdx} took`);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
