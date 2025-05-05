import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attraction } from '../attractions/attraction.entity';
import { UserLocation } from './location.entity';
import { KakaoMapService } from '../kakao-map/kakao-map.service';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Attraction)
    private attractionRepository: Repository<Attraction>,
    @InjectRepository(UserLocation)
    private userLocationRepository: Repository<UserLocation>,
    private kakaoMapService: KakaoMapService,
  ) {}

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

  async saveUserLocation(
    userId: number,
    name: string,
    lat: number,
    lng: number,
    address: string,
  ) {
    const location = this.userLocationRepository.create({
      userId,
      name,
      latitude: lat,
      longitude: lng,
      address,
    });

    return this.userLocationRepository.save(location);
  }

  async getUserSavedLocations(userId: number) {
    return this.userLocationRepository.find({ where: { userId } });
  }

  // async searchPlacesByKeyword(keyword: string) {
  //   // 카카오 맵 API 연동
  //   return this.kakaoMapService.searchPlaces(keyword);
  // }
}