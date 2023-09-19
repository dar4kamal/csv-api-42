import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
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

  async getLatestYearRecords() {
    const getLatestYearPipeline: Array<PipelineStage> = [
      { $group: { _id: '$time' } },
      { $sort: { _id: -1 } },
      { $limit: 1 },
      { $project: { _id: 0, value: '$_id' } },
    ];
    const [latestYear] = await this.recordModel.aggregate(
      getLatestYearPipeline,
    );

    const data = await this.recordModel
      .find({ time: latestYear.value })
      .select('-_id ref_area obs_value');

    return data;
  }
}
