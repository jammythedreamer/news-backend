import { ApiProperty } from '@nestjs/swagger';

export class NaverNewsItem {
  @ApiProperty({ description: '뉴스 제목', example: '시니어 관련 뉴스 제목' })
  title: string;

  @ApiProperty({ description: '뉴스 원본 링크', example: 'https://news.example.com/article/123' })
  originallink: string;

  @ApiProperty({ description: '뉴스 네이버 링크', example: 'https://news.naver.com/main/read.nhn?mode=...' })
  link: string;

  @ApiProperty({ description: '뉴스 설명', example: '뉴스 내용 요약...' })
  description: string;

  @ApiProperty({ description: '발행일', example: 'Mon, 16 Jan 2024 10:30:00 +0900' })
  pubDate: string;
}

export class NaverNewsResponse {
  @ApiProperty({ description: '마지막 빌드 날짜', example: 'Mon, 16 Jan 2024 10:30:00 +0900' })
  lastBuildDate: string;

  @ApiProperty({ description: '총 검색 결과 개수', example: 12345 })
  total: number;

  @ApiProperty({ description: '검색 시작 위치', example: 1 })
  start: number;

  @ApiProperty({ description: '한 번에 표시할 검색 결과 개수', example: 10 })
  display: number;

  @ApiProperty({ description: '뉴스 목록', type: [NaverNewsItem] })
  items: NaverNewsItem[];
}