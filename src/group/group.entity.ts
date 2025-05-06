import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  BeforeInsert } from 'typeorm';
import { User } from '../user/user.entity'; // User 엔티티 임포트
import { Schedule } from '../schedules/schedules.entity';
import { v4 as uuidv4 } from 'uuid';
import {GroupMember} from "./group-member.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 그룹 이름

  @Column('text', { nullable: true })
  description: string; // 그룹 설명

  @Column()
  createdBy: number; // 방장 (User의 id)

  @Column({ unique: true })
  inviteCode: string;

  @BeforeInsert()
  generateInviteCode() {
    this.inviteCode = uuidv4();
  }

  // 그룹에 속한 회원들
  @ManyToMany(() => User, user => user.groups)
  members: User[];

  // 그룹에 공유된 일정들
  @OneToMany(() => Schedule, schedule => schedule.group)
  schedules: Schedule[];

  @OneToMany(() => GroupMember, (groupMember) => groupMember.group)
  members: GroupMember[];


  // 9개의 해시태그를 설정할 수 있는 기능 추가
  @Column('simple-array', { nullable: true })
  hashtags: string[]; // 여행 태그를 배열로 저장

}
