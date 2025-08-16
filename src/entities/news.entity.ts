import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('news')
@Index(['publishedAt', 'category'])
@Index(['source'])
export class News {
  @ApiProperty({ description: '뉴스 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '뉴스 제목', example: '오늘의 주요 뉴스' })
  @Column({ type: 'varchar', length: 500 })
  title: string;

  @ApiProperty({ description: '뉴스 설명', example: '오늘 발생한 주요 사건에 대한 설명' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: '뉴스 본문', example: '전체 기사 내용...' })
  @Column({ type: 'text', nullable: true })
  content: string;

  @ApiProperty({ description: '원본 URL', example: 'https://news.example.com/article/123' })
  @Column({ type: 'varchar', length: 1000 })
  url: string;

  @ApiProperty({ description: '이미지 URL', example: 'https://news.example.com/images/123.jpg' })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  imageUrl: string;

  @ApiProperty({ description: '뉴스 출처', example: 'Reuters' })
  @Column({ type: 'varchar', length: 100 })
  source: string;

  @ApiProperty({ description: '저자', example: 'John Doe' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  author: string;

  @ApiProperty({ description: '카테고리', example: 'technology' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  category: string;

  @ApiProperty({ description: '발행일', example: '2024-01-01T00:00:00Z' })
  @Column({ type: 'datetime' })
  publishedAt: Date;

  @ApiProperty({ description: '생성일', example: '2024-01-01T00:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일', example: '2024-01-01T00:00:00Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}