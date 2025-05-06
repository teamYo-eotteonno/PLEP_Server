import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import { UserLocation } from './user/user-location.entity';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { Schedule } from "./schedules/schedules.entity";
import { Group } from "./group/group.entity";

@Module({
  imports: [
    ConfigModule.forRoot(), // 환경설정 모듈
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule을 의존성으로 가져옵니다
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, UserLocation, Schedule, UserLocation, Group], // 엔티티 설정
        synchronize: true, // 자동 동기화 (개발 환경에서만 사용)
      }),
      inject: [ConfigService], // ConfigService를 주입
    }),
    AuthModule,
    UserModule,
    LocationModule,
    GroupModule,
  ],
})
export class AppModule {}
