import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { User } from "../user/user.entity";
import { CreateGroupDto } from './dto/create-group.dto';

const FRONTEND_BASE_URL = 'localhost:8000';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createGroupDto: CreateGroupDto) {
    const group = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(group);
  }

  findOne(id: number) {
    return this.groupRepository.findOne({ where: { id } });
  }


  findAll() {
    return this.groupRepository.find();
  }

  async getInviteUrl(groupId: number): Promise<string> {
    const group = await this.groupRepository.findOneBy({ id: groupId });

    if (!group) {
      throw new NotFoundException('그룹을 찾을 수 없습니다');
    }

    return `${FRONTEND_BASE_URL}/group/invite/${group.inviteCode}`;
  }
}
