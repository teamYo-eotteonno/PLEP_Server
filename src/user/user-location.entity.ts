import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('double')
  latitude: number;

  @Column('double')
  longitude: number;

  @Column()
  address: string;

  @ManyToOne(() => User, user => user.locations)
  user: User;
}