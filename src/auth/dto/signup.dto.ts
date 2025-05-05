import {
    IsEmail,
    IsNotEmpty,
    MinLength,
    Matches,
    IsString,
  } from 'class-validator';
  
  export class SignUpDto {
    @IsNotEmpty()
    username: string;
  
    @IsEmail()
    email: string;
  
    @MinLength(6)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
      message: '비밀번호는 최소 6자이며, 문자와 숫자를 포함해야 합니다.',
    })
    password: string;
  
    @IsNotEmpty()
    passwordConfirm: string;
  
    @IsString()
    bio: string;
  }
  