import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { forwardRef } from '@nestjs/common';
import { User } from '../user/user.entity';
import {Group} from "../group/group.entity";

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time', nullable: true })
  time: string | null;

  @Column({ default: false })
  allDay: boolean;

  @Column({ nullable: true })
  locationUrl: string;

  @Column({ type: 'text', nullable: true })
  memo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.schedules, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Group, group => group.schedules, { nullable: true })
  group: Group; // 그룹 (선택 사항)

}
