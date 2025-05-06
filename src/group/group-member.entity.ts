// src/groups/entities/group-member.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Group } from './group.entity';

export enum GroupMemberRole {
  OWNER = 'owner',
  MEMBER = 'member',
}

@Entity()
export class GroupMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.groupMembers, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Group, group => group.members, { onDelete: 'CASCADE' })
  group: Group;

  @Column({
    type: 'enum',
    enum: GroupMemberRole,
    default: GroupMemberRole.MEMBER,
  })
  role: GroupMemberRole;

  @CreateDateColumn()
  joinedAt: Date;
}
