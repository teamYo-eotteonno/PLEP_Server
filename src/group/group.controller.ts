import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.groupService.findOne(id);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }
}
