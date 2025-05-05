import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserLocation } from './user-location.entity';

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
}