import {
  Controller,
  Get,
  Query,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SearchNearbyDto } from './dto/search-nearby.dto';
import { SaveLocationDto } from './dto/save-location.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('location')
@ApiBearerAuth() // JWT 인증이 필요함을 Swagger에 표시
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('nearby')
  @ApiOperation({ summary: '주변 장소 검색', description: '위도/경도/반경을 기반으로 주변 명소를 검색합니다.' })
  @ApiResponse({ status: 200, description: '주변 장소 검색 성공' })
  async findNearby(@Query() searchNearbyDto: SearchNearbyDto) {
    return this.locationService.findNearbyAttractions(
      searchNearbyDto.latitude,
      searchNearbyDto.longitude,
      searchNearbyDto.radius,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: '사용자 위치 저장', description: '사용자의 현재 위치 정보를 저장합니다.' })
  @ApiBody({ type: SaveLocationDto })
  @ApiResponse({ status: 201, description: '위치 저장 성공' })
  async saveLocation(@Body() saveLocationDto: SaveLocationDto) {
    return this.locationService.saveUserLocation(
      saveLocationDto.userId,
      //saveLocationDto.name,
      saveLocationDto.latitude,
      saveLocationDto.longitude,
      saveLocationDto.address,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('saved')
  @ApiOperation({ summary: '저장된 위치 조회', description: '해당 사용자의 저장된 위치들을 조회합니다.' })
  @ApiQuery({ name: 'userId', type: Number, description: '사용자 ID' })
  @ApiResponse({ status: 200, description: '저장된 위치 조회 성공' })
  async getSavedLocations(@Query('userId') userId: number) {
    return this.locationService.getUserSavedLocations(userId);
  }
}
