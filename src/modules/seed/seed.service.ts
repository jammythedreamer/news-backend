import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Keyword } from '../../entities/keyword.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Keyword)
    private keywordRepository: Repository<Keyword>,
  ) {}

  async onModuleInit() {
    await this.seedInitialData();
  }

  private async seedInitialData() {
    try {
      await this.seedKeywords();
      this.logger.log('Initial data seeding completed');
    } catch (error) {
      this.logger.error('Failed to seed initial data', error);
    }
  }

  private async seedKeywords() {
    const initialKeywords = [
      { name: '시니어', status: true },
      { name: '고령화', status: true },
    ];

    for (const keywordData of initialKeywords) {
      const existingKeyword = await this.keywordRepository.findOne({
        where: { name: keywordData.name },
      });

      if (!existingKeyword) {
        const keyword = this.keywordRepository.create(keywordData);
        await this.keywordRepository.save(keyword);
        this.logger.log(`Created keyword: ${keywordData.name}`);
      } else {
        this.logger.log(`Keyword already exists: ${keywordData.name}`);
      }
    }
  }
}