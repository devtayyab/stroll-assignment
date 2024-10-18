import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  region: string;

  @Prop({ required: true, unique: true })
  order: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);