import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('schedules') // Swagger 문서 상 그룹 이름
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({ summary: '일정 생성', description: '새로운 일정을 등록합니다.' })
  @ApiBody({ type: CreateScheduleDto })
  @ApiResponse({ status: 201, description: '일정 생성 성공' })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  @ApiOperation({
    summary: '일정 목록 조회',
    description: '연도와 월을 기준으로 일정을 필터링하거나 전체 일정을 조회합니다.',
  })
  @ApiQuery({ name: 'year', required: false, description: '조회할 연도' })
  @ApiQuery({ name: 'month', required: false, description: '조회할 월 (1~12)' })
  @ApiResponse({ status: 200, description: '일정 목록 조회 성공' })
  findByMonth(
    @Query('year') year?: string,
    @Query('month') month?: string,
  ) {
    if (year && month) {
      return this.schedulesService.findByMonth(+year, +month);
    }
    return this.schedulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '일정 상세 조회', description: '특정 ID의 일정을 조회합니다.' })
  @ApiParam({ name: 'id', description: '일정 ID' })
  @ApiResponse({ status: 200, description: '일정 조회 성공' })
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '일정 수정', description: '특정 ID의 일정을 수정합니다.' })
  @ApiParam({ name: 'id', description: '일정 ID' })
  @ApiBody({ type: UpdateScheduleDto })
  @ApiResponse({ status: 200, description: '일정 수정 성공' })
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '일정 삭제', description: '특정 ID의 일정을 삭제합니다.' })
  @ApiParam({ name: 'id', description: '일정 ID' })
  @ApiResponse({ status: 200, description: '일정 삭제 성공' })
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(+id);
  }
}
