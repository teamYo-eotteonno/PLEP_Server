import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class SearchNearbyDto {
  @ApiProperty({ example: 37.5665, description: '검색할 장소의 위도' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ example: 126.978, description: '검색할 장소의 경도' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({ example: 1000, description: '검색 범위 (미터 단위)' })
  @IsNumber()
  @IsNotEmpty()
  radius: number; // 미터 단위
}
