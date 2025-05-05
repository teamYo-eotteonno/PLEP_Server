import {
    Controller,
    Post,
    Body,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { SignUpDto } from './dto/signup.dto';
  import { SignInDto } from './dto/signin.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { multerOptions } from 'src/common/config';
  
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('signup')
    @UseInterceptors(FileInterceptor('profileImage', multerOptions))// 멀티파트에서 이미지 받기
    async signup(
      @UploadedFile() file: Express.Multer.File,
      @Body() signUpDto: SignUpDto,
    ) {
      return this.authService.signup(signUpDto, file);
    }
  
    @Post('signin')
    async signin(@Body() signInDto: SignInDto) {
      return this.authService.signin(signInDto);
    }
  }
  