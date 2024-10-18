import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AssignmentService } from './assignment.service';

@ApiTags('assignments')
@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get(':region')
  @ApiOperation({ summary: 'Get current assignment for a region' })
  @ApiParam({ name: 'region', required: true, description: 'Region name' })
  @ApiResponse({ status: 200, description: 'Returns the current assignment for the specified region' })
  async getCurrentAssignment(@Param('region') region: string) {
    return this.assignmentService.getCurrentAssignment(region);
  }
}