import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ example: 'Travel Group', description: '그룹 이름' })
  name: string;

  @ApiProperty({ example: 'A group for travel enthusiasts.', description: '그룹 설명' })
  description: string;

  @ApiProperty({ example: 1, description: '방장 ID (관리자 역할)' })
  createdBy: number; // 방장 ID

  @ApiProperty({
    example: ['#adventure', '#beach', '#mountains'],
    description: '그룹에 관련된 해시태그 배열'
  })
  hashtags: string[];
}
