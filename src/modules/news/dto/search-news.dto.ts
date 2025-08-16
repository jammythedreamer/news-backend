import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsInt, Min, Max, IsIn } from 'class-validator';

export class SearchNewsDto {
  @ApiProperty({ 
    description: '검색어', 
    example: '시니어',
    required: true 
  })
  @IsString()
  query: string;

  @ApiProperty({ 
    description: '검색 결과 개수 (1~100)', 
    example: 10, 
    default: 10,
    required: false 
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  display?: number = 10;

  @ApiProperty({ 
    description: '검색 시작 위치 (1~1000)', 
    example: 1, 
    default: 1,
    required: false 
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsOptional()
  start?: number = 1;

  @ApiProperty({ 
    description: '검색 필터', 
    example: 'all',
    enum: ['all', 'title', 'content'],
    default: 'all',
    required: false 
  })
  @IsIn(['all', 'title', 'content'])
  @IsOptional()
  filter?: string = 'all';

  @ApiProperty({ 
    description: '정렬 순서', 
    example: 'date',
    enum: ['sim', 'date'],
    default: 'date',
    required: false 
  })
  @IsIn(['sim', 'date'])
  @IsOptional()
  sort?: string = 'date';
}