import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'user123', description: '사용자 이름' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'securePassword123!', description: '비밀번호' })
  @IsNotEmpty()
  password: string;
}
