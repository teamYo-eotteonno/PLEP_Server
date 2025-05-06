import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { Schedule } from './schedules.entity';
import { UserModule } from '../user/user.module'; // 추가

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule]),
    forwardRef(() => UserModule), // 추가
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService], // 필요시 외부 사용 가능
})
export class SchedulesModule {}
