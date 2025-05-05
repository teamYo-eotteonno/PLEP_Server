import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn } from 'typeorm';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  // 일정 제목
  @Column()
  title: string;

  // 일정 날짜
  @Column({ type: 'date' })
  date: string;

  // 일정 시간 
  @Column({ type: 'time', nullable: true })
  time: string | null;

  // 일정 하루 종일 설정
  @Column({ default: false })
  allDay: boolean;

  // 일정에 대한 위치 url
  @Column({ nullable: true })
  locationUrl: string;

  // 일정에 관한 메모
  @Column({ type: 'text', nullable: true })
  memo: string;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
