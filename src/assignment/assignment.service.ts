import { Injectable, Logger, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Assignment, AssignmentDocument } from './assignment.schema';
import { QuestionService } from '../question/question.service';
import { CycleService } from '../cycle/cycle.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AssignmentService {
  private readonly logger = new Logger(AssignmentService.name);

  constructor(
    @InjectModel(Assignment.name) private assignmentModel: Model<AssignmentDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private questionService: QuestionService,
    private cycleService: CycleService,
  ) {}

  @Cron(CronExpression.EVERY_WEEK)
  async handleWeeklyCron() {
    this.logger.log('Running weekly question assignment');
    await this.assignQuestionsForNewCycle();
  }

  async assignQuestionsForNewCycle() {
    const nextCycleNumber = await this.cycleService.getNextCycleNumber();
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const newCycle = await this.cycleService.create({
      startDate,
      endDate,
      duration: 7,
      cycleNumber: nextCycleNumber,
    });

    const regions = ['Singapore', 'US']; // Add more regions as needed
    for (const region of regions) {
      const question = await this.questionService.findByRegionAndOrder(region, nextCycleNumber);
      if (question) {
        const assignment = await this.createAssignment({
          question: question.id,
          cycle: newCycle.id,
          region,
        });
        // Cache the new assignment
        await this.cacheManager.set(`assignment:${region}`, assignment, 604800000); // Cache for 1 week (in milliseconds)
      }
    }
  }

  async createAssignment(createAssignmentDto: any): Promise<Assignment> {
    const createdAssignment = new this.assignmentModel(createAssignmentDto);
    return createdAssignment.save();
  }

  async getCurrentAssignment(region: string): Promise<Assignment> {
    // Try to get the assignment from cache
    const cachedAssignment = await this.cacheManager.get<Assignment>(`assignment:${region}`);
    if (cachedAssignment) {
      return cachedAssignment;
    }

    // If not in cache, get from database
    const currentCycle = await this.cycleService.findCurrentCycle();
    if (!currentCycle) {
      return null;
    }
    const assignment = await this.assignmentModel
      .findOne({ cycle: currentCycle.id, region })
      .populate('question')
      .populate('cycle')
      .exec();

    // Cache the assignment if found
    if (assignment) {
      await this.cacheManager.set(`assignment:${region}`, assignment, 604800000); // Cache for 1 week (in milliseconds)
    }

    return assignment;
  }
}