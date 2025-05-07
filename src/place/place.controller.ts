import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('places') // Swagger 그룹 이름
@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('search')
  @ApiOperation({
    summary: '장소 검색',
    description: '키워드를 이용해 장소를 검색합니다.',
  })
  @ApiQuery({ name: 'keyword', required: true, description: '검색할 장소 키워드' })
  @ApiResponse({ status: 200, description: '검색 결과 반환 성공' })
  async searchPlaces(@Query('keyword') keyword: string) {
    return await this.placeService.searchPlaces(keyword);
  }

  @Post('save/:groupId')
  @ApiOperation({
    summary: '장소 저장',
    description: '특정 그룹에 장소를 저장합니다.',
  })
  @ApiParam({ name: 'groupId', description: '그룹 ID', type: Number })
  @ApiBody({ description: '저장할 장소 데이터', type: Object })
  @ApiResponse({ status: 201, description: '장소 저장 성공' })
  async savePlace(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() placeData: any,
  ) {
    return await this.placeService.savePlace(groupId, placeData);
  }
}
