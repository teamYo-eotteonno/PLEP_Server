// src/place/place.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Location } from '../location/location.entity';
import { Group } from '../group/group.entity';

@Injectable()
export class PlaceService {
  private readonly kakaoRestApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {
    const key = this.configService.get<string>('KAKAO_REST_API_KEY');
    if (!key) {
      throw new Error('KAKAO_REST_API_KEY is not defined in environment variables.');
    }
    this.kakaoRestApiKey = key;
  }

  // 1. 키워드로 장소 검색
  async searchPlaces(keyword: string): Promise<any> {
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}`;

    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: { Authorization: `KakaoAK ${this.kakaoRestApiKey}` },
      }),
    );

    return response.data.documents; // → 프론트에 장소 리스트 전달
  }

  // 2. 그룹에 장소 저장
  async savePlace(groupId: number, placeData: any): Promise<Location> {
    const group = await this.groupRepository.findOneBy({ id: groupId });
    if (!group) throw new NotFoundException('Group not found');

    const location = this.locationRepository.create({
      kakaoPlaceId: placeData.id,
      placeName: placeData.place_name,
      address: placeData.address_name,
      roadAddress: placeData.road_address_name,
      latitude: parseFloat(placeData.y),
      longitude: parseFloat(placeData.x),
      kakaoPlaceUrl: placeData.place_url,
      category: placeData.category_name,
      phone: placeData.phone,
      extraData: null, // 사용자 정의 데이터(추후 확장 가능)
      group: group,
    });

    // save() 메서드는 배열을 반환할 수 있으므로 첫 번째 객체만 반환하도록 처리
    const savedLocation = await this.locationRepository.save(location);

    // 단일 객체를 반환합니다.
    return Array.isArray(savedLocation) ? savedLocation[0] : savedLocation;
  }
}
