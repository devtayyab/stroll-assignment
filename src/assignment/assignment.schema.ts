import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Question } from '../question/question.schema';
import { Cycle } from '../cycle/cycle.schema';

export type AssignmentDocument = Assignment & Document;

@Schema()
export class Assignment {
  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  question: Question;

  @Prop({ type: Types.ObjectId, ref: 'Cycle', required: true })
  cycle: Cycle;

  @Prop({ required: true })
  region: string;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);