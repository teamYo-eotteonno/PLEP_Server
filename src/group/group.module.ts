import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import {GroupMember} from "./group-member.entity";
import {User} from "../user/user.entity";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, GroupMember, User]), // 👈 User 추가
    UserModule, // 👈 UserModule import
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
