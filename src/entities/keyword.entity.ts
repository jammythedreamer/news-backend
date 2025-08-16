import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { News } from './news.entity';

@Entity('keyword')
export class Keyword {
  @ApiProperty({ description: '키워드 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '키워드 이름', example: '시니어' })
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @ApiProperty({ description: '활성화 상태', example: true })
  @Column({ type: 'boolean', default: true })
  status: boolean;

  @ApiProperty({ description: '관련 뉴스 목록', type: () => [News] })
  @ManyToMany(() => News, (news) => news.keywords)
  news: News[];

  @ApiProperty({ description: '생성일', example: '2024-01-01T00:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일', example: '2024-01-01T00:00:00Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}