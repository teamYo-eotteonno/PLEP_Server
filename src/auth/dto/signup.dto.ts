import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'user123', description: '사용자 이름' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'user@example.com', description: '이메일 주소' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'securePassword123!',
    description: '비밀번호 (최소 6자, 문자와 숫자 포함)',
  })
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: '비밀번호는 최소 6자이며, 문자와 숫자를 포함해야 합니다.',
  })
  password: string;

  @ApiProperty({ example: 'securePassword123!', description: '비밀번호 확인' })
  @IsNotEmpty()
  passwordConfirm: string;

  @ApiProperty({ example: 'I love coding and hiking.', description: '자기소개' })
  @IsString()
  bio: string;
}
