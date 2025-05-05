// src/attractions/attractions.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attraction } from './attraction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attraction])],
  exports: [TypeOrmModule],
})
export class AttractionsModule {}