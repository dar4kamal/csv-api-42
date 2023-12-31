import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';

import { Record } from './record.schema';
import FilterRecordsDTO from './dto/filter-records.dto';
import FindByCountryDTO from './dto/find-by-country.dto';

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
    if (!latestYear)
      throw new NotFoundException(
        'No records were found, please upload csv first',
      );

    const data = await this.recordModel
      .find({ time: latestYear.value })
      .select('-_id ref_area obs_value');

    return data;
  }

  async getCountryRecords(params: FindByCountryDTO) {
    const { country } = params;
    const data = await this.recordModel
      .find({ ref_area: country })
      .select('-_id');

    return data;
  }

  async getAllRecords(params: FilterRecordsDTO) {
    const { sex, country, ageGroup, year } = params;

    const data = await this.recordModel
      .find({
        ...(sex ? { sex } : {}),
        ...(year ? { time: +year } : {}),
        ...(country ? { ref_area: country } : {}),
        ...(ageGroup ? { classif1: ageGroup } : {}),
      })
      .select('-_id');

    return data;
  }
}
