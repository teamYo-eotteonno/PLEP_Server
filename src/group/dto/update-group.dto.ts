import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupDto {
  @ApiProperty({ example: '여행 친구들', description: '그룹 이름', required: false })
  name?: string;

  @ApiProperty({ example: '우리만의 여행 계획', description: '그룹 설명', required: false })
  description?: string;

  @ApiProperty({ example: ['여행', '식사', '기타'], description: '그룹 해시태그', required: false })
  hashtags?: string[]; // 9개 해시태그
}
