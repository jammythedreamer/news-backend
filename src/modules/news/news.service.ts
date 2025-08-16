import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { SearchNewsDto } from './dto/search-news.dto';
import { NaverNewsResponse } from './dto/naver-news-response.dto';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  private httpClient: AxiosInstance;

  constructor(private configService: ConfigService) {
    const naverClientId = this.configService.get<string>('NAVER_CLIENT_ID') || '';
    const naverClientSecret = this.configService.get<string>('NAVER_CLIENT_SECRET') || '';

    this.httpClient = axios.create({
      baseURL: 'https://openapi.naver.com',
      headers: {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': naverClientId,
        'X-Naver-Client-Secret': naverClientSecret,
      },
    });
  }

  async searchNews(searchDto: SearchNewsDto): Promise<NaverNewsResponse> {
    const naverClientId = this.configService.get<string>('NAVER_CLIENT_ID');
    const naverClientSecret = this.configService.get<string>('NAVER_CLIENT_SECRET');
    
    if (!naverClientId || !naverClientSecret) {
      throw new HttpException(
        'Naver API credentials are not configured',
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }

    try {
      this.logger.log(`Searching news with query: ${searchDto.query}`);

      const params = new URLSearchParams({
        query: searchDto.query,
        display: searchDto.display?.toString() || '10',
        start: searchDto.start?.toString() || '1',
        filter: searchDto.filter || 'all',
        sort: searchDto.sort || 'date',
      });

      const response = await this.httpClient.get<NaverNewsResponse>(
        `/v1/search/news?${params.toString()}`
      );

      this.logger.log(`Found ${response.data.total} news items`);
      
      // HTML 태그 제거 및 데이터 정제
      const cleanedItems = response.data.items.map(item => ({
        ...item,
        title: this.cleanHtmlTags(item.title),
        description: this.cleanHtmlTags(item.description),
      }));

      return {
        ...response.data,
        items: cleanedItems,
      };
    } catch (error) {
      this.logger.error('Failed to search news from Naver API', error);
      
      if (error.response) {
        throw new HttpException(
          `Naver API Error: ${error.response.status} - ${error.response.statusText}`,
          HttpStatus.BAD_GATEWAY
        );
      }
      
      throw new HttpException(
        'Failed to fetch news from external service',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private cleanHtmlTags(text: string): string {
    return text
      .replace(/<[^>]*>/g, '') // HTML 태그 제거
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();
  }
}