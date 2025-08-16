import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { Keyword } from '../../entities/keyword.entity';

@ApiTags('키워드')
@Controller('keywords')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get()
  @ApiOperation({ summary: '키워드 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '키워드 목록 조회 성공',
    type: [Keyword],
  })
  async findAll(): Promise<Keyword[]> {
    return this.keywordService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '키워드 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '키워드 조회 성공',
    type: Keyword,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Keyword> {
    return this.keywordService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '키워드 생성' })
  @ApiResponse({
    status: 201,
    description: '키워드 생성 성공',
    type: Keyword,
  })
  async create(@Body() createKeywordDto: CreateKeywordDto): Promise<Keyword> {
    return this.keywordService.create(createKeywordDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '키워드 수정' })
  @ApiResponse({
    status: 200,
    description: '키워드 수정 성공',
    type: Keyword,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateKeywordDto: UpdateKeywordDto,
  ): Promise<Keyword> {
    return this.keywordService.update(id, updateKeywordDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '키워드 삭제' })
  @ApiResponse({
    status: 200,
    description: '키워드 삭제 성공',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.keywordService.remove(id);
  }
}