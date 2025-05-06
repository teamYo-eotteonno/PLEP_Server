import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Group } from '../group/group.entity'; // Group 엔티티 임포트
import { Schedule } from '../schedules/schedules.entity';
import { UserLocation } from './user-location.entity';
import {GroupMember} from "../group/group-member.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  profileImage: string; // 파일명 or S3 경로

  @Column({ type: 'text', nullable: true })
  bio: string; // 자기소개

  // 위치 관계
  @OneToMany(() => UserLocation, location => location.user)
  locations: UserLocation[];

  @OneToMany(() => Schedule, schedule => schedule.user)
  schedules: Schedule[];

  // 그룹 관계 (ManyToMany: 유저는 여러 그룹에 속할 수 있음)
  @ManyToMany(() => Group, group => group.members)
  @JoinTable()
  groups: Group[];

  @OneToMany(() => GroupMember, (groupMember) => groupMember.user)
  groupMembers: GroupMember[];

}
