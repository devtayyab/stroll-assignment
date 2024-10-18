import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { Assignment, AssignmentSchema } from './assignment.schema';
import { QuestionModule } from '../question/question.module';
import { CycleModule } from '../cycle/cycle.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Assignment.name, schema: AssignmentSchema }]),
    QuestionModule,
    CycleModule,
  ],
  providers: [AssignmentService],
  controllers: [AssignmentController],
})
export class AssignmentModule {}