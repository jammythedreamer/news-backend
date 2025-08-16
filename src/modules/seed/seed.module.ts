import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Keyword } from '../../entities/keyword.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}