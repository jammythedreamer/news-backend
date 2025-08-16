import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { News } from './news.entity';

@Entity('category')
export class Category {
  @ApiProperty({ description: '카테고리 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '카테고리 이름', example: 'technology' })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({ description: '관련 뉴스 목록', type: () => [News] })
  @ManyToMany(() => News, (news) => news.categories)
  news: News[];
}
