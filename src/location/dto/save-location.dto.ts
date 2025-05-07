import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class SaveLocationDto {
  @ApiProperty({ example: 1, description: '사용자 ID' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: '서울역', description: '장소 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 37.5665, description: '위도' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ example: 126.978, description: '경도' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({ example: '서울특별시 중구 서울역로 1', description: '장소 주소' })
  @IsString()
  address: string;
}
