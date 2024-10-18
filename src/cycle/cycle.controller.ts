import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CycleService } from './cycle.service';
import { Cycle } from './cycle.schema';

@ApiTags('cycles')
@Controller('cycles')
export class CycleController {
  constructor(private readonly cycleService: CycleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cycle' })
  @ApiResponse({ status: 201, description: 'The cycle has been successfully created.' })
  async create(@Body() createCycleDto: any): Promise<Cycle> {
    return this.cycleService.create(createCycleDto);
  }

  @Get('current')
  @ApiOperation({ summary: 'Get the current cycle' })
  @ApiResponse({ status: 200, description: 'Return the current cycle.' })
  async findCurrentCycle(): Promise<Cycle> {
    return this.cycleService.findCurrentCycle();
  }
}