import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SchedulesModule } from '../schedules/schedules.module'; // 추가

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => SchedulesModule), // 추가
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
