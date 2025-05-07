// user-location.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from "../user/user.entity";
import {Group} from "../group/group.entity";

@Entity()
export class UserLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.locations)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number; // 👈 실제 외래키 컬럼

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  kakaoPlaceId: string;

  @Column()
  placeName: string;

  @Column({ nullable: true })
  roadAddress: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitude: number;

  @Column({ nullable: true })
  kakaoPlaceUrl: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  phone: string;

  // 향후 친구가 넘겨줄 추가 정보용
  @Column({ type: 'json', nullable: true })
  extraData: any;

  @ManyToOne(() => Group, (group) => group.locations)
  group: Group;


}
export class Location {}