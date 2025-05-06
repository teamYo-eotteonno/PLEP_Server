// user-location.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from "../user/user.entity";

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

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  address: string;


}
