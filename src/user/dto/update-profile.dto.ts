import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    description: '프로필 이미지 URL',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiProperty({
    description: '사용자 닉네임',
    example: '홍길동',
    required: false,
  })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({
    description: '사용자 자기소개',
    example: '안녕하세요, 개발자입니다!',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;
}
