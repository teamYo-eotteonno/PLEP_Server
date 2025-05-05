import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Between } from 'typeorm';
import { Schedule } from './schedules.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async create(createDto: CreateScheduleDto): Promise<Schedule> {
    const schedule = this.scheduleRepository.create(createDto);
    return this.scheduleRepository.save(schedule);
  }

  findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find();
  }

  async findOne(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({ where: { id } });
    if (!schedule) {
      throw new NotFoundException(`No schedule found with id ${id}`);
    }
    return schedule;
  }

  async update(id: number, updateDto: UpdateScheduleDto): Promise<Schedule> {
    await this.scheduleRepository.update(id, updateDto);
    return this.findOne(id); // 업데이트 후 최신 값 반환
  }

  async remove(id: number): Promise<void> {
    const result = await this.scheduleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`No schedule found with id ${id}`);
    }
  }

  // 년 & 월별로 여행 일정 조회
  async findByMonth(year: number, month: number): Promise<Schedule[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);
  
    return this.scheduleRepository
      .createQueryBuilder('schedule')
      .where('schedule.date BETWEEN :start AND :end', {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      })
      .orderBy('schedule.date', 'ASC')
      .getMany();
  }
  
  
}
