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
import {GroupMember} from "./group/group-member.entity";
import { Location } from './location/location.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }), // 환경설정 모듈
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule을 의존성으로 가져옵니다
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          User,
          UserLocation,
          Schedule,
          Group,
          GroupMember,
          Location ], // 엔티티 설정 좀 잘 넣어라 제발 넣고 에러 확인하라고..
        synchronize: true, // 자동 동기화
      }),
      inject: [ConfigService], // ConfigService를 주입
    }),
    // 이것도 기능 만들고 좀 확인해 제발
    AuthModule,
    UserModule,
    LocationModule,
    GroupModule,
  ],
})
export class AppModule {}
