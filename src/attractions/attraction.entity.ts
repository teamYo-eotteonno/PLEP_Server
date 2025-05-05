import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Geometry } from 'geojson';

@Entity()
export class Attraction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('geometry', {
    spatialFeatureType: 'Point',
    srid: 4326, // WGS84 좌표계
  })
  location: Geometry;

  @Column()
  address: string;

  @Column({ nullable: true })
  description: string;

  @Column('varchar', { array: true, nullable: true })
  tags: string[];

  @Column({ type: 'float', nullable: true })
  rating: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;
}