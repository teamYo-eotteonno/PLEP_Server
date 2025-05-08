import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attraction } from '../attractions/attraction.entity';
import { Location } from './location.entity';
import { KakaoMapService } from '../kakao-map/kakao-map.service';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Attraction)
    private attractionRepository: Repository<Attraction>,
    @InjectRepository(Location)
    private userLocationRepository: Repository<Location>,
    private kakaoMapService: KakaoMapService,
  ) {}

  // 1. 근처 명소 찾기
  async findNearbyAttractions(lat: number, lng: number, radius: number) {
    return this.attractionRepository
      .createQueryBuilder('attraction')
      .where(
        `ST_DWithin(
          attraction.location,
          ST_SetSRID(ST_MakePoint(:lng, :lat), 4326),
          :radius
        )`,
        { lat, lng, radius },
      )
      .orderBy(
        `ST_Distance(
          attraction.location,
          ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)
        )`,
        'ASC',
      )
      .getMany();
  }

  // 2. 사용자 위치 저장
  async saveUserLocation(
    userId: number,
    lat: number,
    lng: number,
    address: string,
  ) {
    // 사용자 위치 저장
    const location = this.userLocationRepository.create({
      userId, // 외래키 사용
      latitude: lat,
      longitude: lng,
      address,
    });

    return this.userLocationRepository.save(location);
  }

  // 3. 사용자가 저장한 위치 목록 가져오기
  async getUserSavedLocations(userId: number) {
    return this.userLocationRepository.find({ where: { userId } });
  }

  // 4. 카카오 맵 API를 사용하여 키워드로 장소 검색
  async searchPlacesByKeyword(keyword: string) {
    return this.kakaoMapService.searchPlaces(keyword); // KakaoMapService를 사용하여 검색
  }
}
