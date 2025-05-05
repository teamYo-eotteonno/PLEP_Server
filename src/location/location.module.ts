import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Attraction } from '../attractions/attraction.entity'; // 이전에 만든 엔티티
import { KakaoMapService } from '../kakao-map/kakao-map.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attraction]), // Attraction 엔티티 사용
    HttpModule, // KakaoMapService에서 HTTP 요청을 위해 필요
  ],
  controllers: [LocationController],
  providers: [LocationService, KakaoMapService],
  exports: [LocationService], // 다른 모듈에서 사용할 경우
})
export class LocationModule {}