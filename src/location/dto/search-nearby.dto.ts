import { IsNumber, IsNotEmpty } from 'class-validator';

export class SearchNearbyDto {
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  radius: number; // 미터 단위
}