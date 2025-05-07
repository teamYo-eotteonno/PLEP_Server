import { ApiProperty } from '@nestjs/swagger';

export class JoinGroupDto {
  @ApiProperty({ example: 1, description: '참가할 사용자 ID' })
  userId: number;     // 참가할 사용자 ID

  @ApiProperty({ example: 1, description: '참가할 그룹 ID' })
  groupId: number;    // 참가할 그룹 ID
}
