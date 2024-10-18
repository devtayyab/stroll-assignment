import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CycleDocument = Cycle & Document;

@Schema()
export class Cycle {
  @Prop({ required: true })
  id: Date;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  cycleNumber: number;
}

export const CycleSchema = SchemaFactory.createForClass(Cycle);