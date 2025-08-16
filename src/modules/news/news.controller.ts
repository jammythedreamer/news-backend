import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { SearchNewsDto } from './dto/search-news.dto';
import { NaverNewsResponse } from './dto/naver-news-response.dto';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('search')
  @ApiOperation({ 
    summary: '뉴스 검색', 
    description: 'Naver API를 사용하여 뉴스를 검색합니다.' 
  })
  @ApiQuery({ name: 'query', description: '검색어', example: '시니어' })
  @ApiQuery({ name: 'display', description: '검색 결과 개수 (1~100)', required: false, example: 10 })
  @ApiQuery({ name: 'start', description: '검색 시작 위치 (1~1000)', required: false, example: 1 })
  @ApiQuery({ name: 'filter', description: '검색 필터 (all, title, content)', required: false, example: 'all' })
  @ApiQuery({ name: 'sort', description: '정렬 순서 (sim, date)', required: false, example: 'date' })
  @ApiResponse({ 
    status: 200, 
    description: '뉴스 검색 성공',
    type: NaverNewsResponse
  })
  @ApiResponse({ 
    status: 400, 
    description: '잘못된 요청 파라미터' 
  })
  @ApiResponse({ 
    status: 502, 
    description: 'Naver API 오류' 
  })
  async searchNews(@Query() searchDto: SearchNewsDto): Promise<NaverNewsResponse> {
    return this.newsService.searchNews(searchDto);
  }
}