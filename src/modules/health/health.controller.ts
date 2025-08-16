import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  @Get()
  @ApiOperation({ summary: '헬스 체크', description: '서버 및 데이터베이스 연결 상태를 확인합니다.' })
  @ApiResponse({ 
    status: 200, 
    description: '헬스 체크 성공',
    schema: {
      example: {
        status: 'healthy',
        timestamp: '2024-01-01T00:00:00.000Z',
        database: {
          connected: true,
          type: 'mysql'
        }
      }
    }
  })
  async check() {
    const isDbConnected = await this.checkDatabase();
    
    return {
      status: isDbConnected ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: isDbConnected,
        type: 'mysql',
      },
    };
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      await this.dataSource.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }
}