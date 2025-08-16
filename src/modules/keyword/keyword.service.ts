import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Keyword } from '../../entities/keyword.entity';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';

@Injectable()
export class KeywordService {
  constructor(
    @InjectRepository(Keyword)
    private keywordRepository: Repository<Keyword>,
  ) {}

  async findAll(): Promise<Keyword[]> {
    return this.keywordRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Keyword> {
    const keyword = await this.keywordRepository.findOne({
      where: { id },
    });

    if (!keyword) {
      throw new NotFoundException(`키워드 ID ${id}를 찾을 수 없습니다`);
    }

    return keyword;
  }

  async create(createKeywordDto: CreateKeywordDto): Promise<Keyword> {
    const keyword = this.keywordRepository.create(createKeywordDto);
    return this.keywordRepository.save(keyword);
  }

  async update(id: number, updateKeywordDto: UpdateKeywordDto): Promise<Keyword> {
    const keyword = await this.findOne(id);
    Object.assign(keyword, updateKeywordDto);
    return this.keywordRepository.save(keyword);
  }

  async remove(id: number): Promise<void> {
    const keyword = await this.findOne(id);
    await this.keywordRepository.remove(keyword);
  }
}