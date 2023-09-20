import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Record } from './record.schema';
import FilterRecordsDTO from './dto/filter-records.dto';
import FindByCountryDTO from './dto/find-by-country.dto';

@Injectable()
export class RecordsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(Record.name) private recordModel: Model<Record>,
  ) {}

  async insertBatches(batch: Record[], batchIdx: number) {
    try {
      console.time(`Batch ${batchIdx} took`);
      await this.recordModel.insertMany(batch);
      console.timeEnd(`Batch ${batchIdx} took`);
    } catch (error) {
      console.log(error.message);
      await this.reInsertBatch(batchIdx);
    }
  }

  async reInsertBatch(batchIdx: number) {
    try {
      const cached: Record[] = await this.cacheManager.get(`batch-${batchIdx}`);
      await this.recordModel.insertMany(cached);
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
