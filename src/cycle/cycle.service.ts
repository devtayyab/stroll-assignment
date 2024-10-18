import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cycle, CycleDocument } from './cycle.schema';

@Injectable()
export class CycleService {
  constructor(
    @InjectModel(Cycle.name) private cycleModel: Model<CycleDocument>,
  ) {}

  async create(createCycleDto: any): Promise<Cycle> {
    const createdCycle = new this.cycleModel(createCycleDto);
    return createdCycle.save();
  }

  async findCurrentCycle(): Promise<Cycle> {
    const now = new Date();
    return this.cycleModel.findOne({
      startDate: { $lte: now },
      endDate: { $gt: now },
    }).exec();
  }

  async getNextCycleNumber(): Promise<number> {
    const latestCycle = await this.cycleModel
      .findOne()
      .sort({ cycleNumber: -1 })
      .exec();
    return latestCycle ? latestCycle.cycleNumber + 1 : 1;
  }
}