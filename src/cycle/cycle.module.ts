import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CycleService } from './cycle.service';
import { CycleController } from './cycle.controller';
import { Cycle, CycleSchema } from './cycle.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cycle.name, schema: CycleSchema }])],
  providers: [CycleService],
  controllers: [CycleController],
  exports: [CycleService],
})
export class CycleModule {}