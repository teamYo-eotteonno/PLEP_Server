import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { Query } from '@nestjs/common';
  import { SchedulesService } from './schedules.service';
  import { CreateScheduleDto } from './dto/create-schedule.dto';
  import { UpdateScheduleDto } from './dto/update-schedule.dto';
  
  @Controller('schedules')
  export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}
  
    @Post()
    create(@Body() createScheduleDto: CreateScheduleDto) {
      return this.schedulesService.create(createScheduleDto);
    }
  
    // 년&월별로 페이징 처리해서 날짜 항목 조회
    @Get()
    findByMonth(
    @Query('year') year?: string,
    @Query('month') month?: string,
    ) {
    if (year && month) {
      return this.schedulesService.findByMonth(+year, +month);
    }
      return this.schedulesService.findAll(); // year, month 없으면 전체 조회
    }
  
    // 특정 계획 조회
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.schedulesService.findOne(+id);
    }
  
    // 일정 업데이트
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateScheduleDto: UpdateScheduleDto,
    ) {
      return this.schedulesService.update(+id, updateScheduleDto);
    }
  
    // 일정 삭제
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.schedulesService.remove(+id);
    }
  }
  