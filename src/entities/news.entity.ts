import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.entity';
import { Keyword } from './keyword.entity';

@Entity('news')
@Index(['publishedAt'])
@Index(['source'])
export class News {
  @ApiProperty({ description: '뉴스 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '뉴스 제목', example: '오늘의 주요 뉴스' })
  @Column({ type: 'varchar', length: 500 })
  title: string;

  @ApiProperty({
    description: '뉴스 설명',
    example: '오늘 발생한 주요 사건에 대한 설명',
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: '뉴스 본문', example: '전체 기사 내용...' })
  @Column({ type: 'text', nullable: true })
  content: string;

  @ApiProperty({
    description: '원본 URL',
    example: 'https://news.example.com/article/123',
  })
  @Column({ type: 'varchar', length: 1000 })
  originalLink: string;

  @ApiProperty({
    description: '뉴스 링크',
    example: 'https://news.example.com/article/123',
  })
  @Column({ type: 'varchar', length: 1000 })
  link: string;

  @ApiProperty({ description: '뉴스 출처', example: 'Reuters' })
  @Column({ type: 'varchar', length: 100 })
  source: string;

  @ApiProperty({ description: '발행일', example: '2024-01-01T00:00:00Z' })
  @Column({ type: 'datetime' })
  publishedAt: Date;

  @ApiProperty({ description: '카테고리 목록', type: () => [Category] })
  @ManyToMany(() => Category, (category) => category.news, { cascade: true })
  @JoinTable({
    name: 'news_category',
    joinColumn: { name: 'news_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @ApiProperty({ description: '키워드 목록', type: () => [Keyword] })
  @ManyToMany(() => Keyword, (keyword) => keyword.news, { cascade: true })
  @JoinTable({
    name: 'news_keyword',
    joinColumn: { name: 'news_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'keyword_id', referencedColumnName: 'id' },
  })
  keywords: Keyword[];

  @ApiProperty({ description: '생성일', example: '2024-01-01T00:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일', example: '2024-01-01T00:00:00Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
