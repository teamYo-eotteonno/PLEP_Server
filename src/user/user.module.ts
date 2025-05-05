import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // User 엔티티 import
import { UserService } from './user.service'; // UserService import
import { UserController } from './user.controller'; // UserController import

@Module({
  imports: [TypeOrmModule.forFeature([User])], // TypeORM을 이용해 User 리포지토리 주입
  providers: [UserService], // 서비스 등록
  controllers: [UserController], // 컨트롤러 등록
  exports: [UserService], // 다른 모듈에서 UserService 사용 가능
})
export class UserModule {}