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
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiConsumes,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('profileImage', multerOptions))
  @ApiOperation({ summary: '회원가입', description: '이미지와 함께 회원가입을 처리합니다.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '회원가입 정보',
    type: SignUpDto,
  })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  async signup(
    @UploadedFile() file: Express.Multer.File,
    @Body() signUpDto: SignUpDto,
  ) {
    return this.authService.signup(signUpDto, file);
  }

  @Post('signin')
  @ApiOperation({ summary: '로그인', description: '아이디와 비밀번호를 통한 로그인' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: '로그인 성공 (JWT 토큰 반환)' })
  async signin(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }
}
