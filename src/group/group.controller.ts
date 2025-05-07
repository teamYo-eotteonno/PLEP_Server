import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('groups') // Swagger 탭 이름
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation({ summary: '그룹 생성', description: '새로운 그룹(방)을 생성합니다.' })
  @ApiBody({ type: CreateGroupDto })
  @ApiResponse({ status: 201, description: '그룹 생성 성공' })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 그룹 조회', description: '그룹 ID로 해당 그룹 정보를 조회합니다.' })
  @ApiParam({ name: 'id', type: Number, description: '그룹 ID' })
  @ApiResponse({ status: 200, description: '그룹 조회 성공' })
  findOne(@Param('id') id: number) {
    return this.groupService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: '모든 그룹 조회', description: '현재 존재하는 모든 그룹을 조회합니다.' })
  @ApiResponse({ status: 200, description: '모든 그룹 조회 성공' })
  findAll() {
    return this.groupService.findAll();
  }
}
