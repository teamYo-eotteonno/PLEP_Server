import { Injectable, ForbiddenException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KakaoMapService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private getHeaders() {
    return {
      Authorization: `KakaoAK ${this.configService.get('KAKAO_MAP_API_KEY')}`,
    };
  }

  async searchPlaces(query: string) {

    const url = 'https://dapi.kakao.com/v2/local/search/keyword.json';
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: this.getHeaders(),
        params: { query },
      }),
    );

    return response.data;
  }
}
