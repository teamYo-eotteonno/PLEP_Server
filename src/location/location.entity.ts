// src/location/location.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Group } from '../group/group.entity'; // Group 엔티티 임포트
import { User } from '../user/user.entity'; // User 엔티티 임포트

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kakaoPlaceId: string;  // kakaoPlaceId 추가

  @Column()
  placeName: string;      // placeName 추가

  @Column()
  address: string;        // address 추가

  @Column()
  roadAddress: string;    // roadAddress 추가

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude: number;       // latitude 추가

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitude: number;      // longitude 추가

  @Column()
  kakaoPlaceUrl: string;  // kakaoPlaceUrl 추가

  @Column()
  category: string;       // category 추가

  @Column()
  phone: string;          // phone 추가

  @ManyToOne(() => Group, (group) => group.locations)
  group: Group;

  @ManyToOne(() => User, (user) => user.locations)
  user: User;

  @Column()
  userId: number; // userId 외래키 컬럼

  @Column({ nullable: true })
  extraData: string | null;  // extraData 추가 (옵션, null 가능)
}
