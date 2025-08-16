import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateKeywordDto {
  @ApiProperty({
    description: '키워드 이름',
    example: '인공지능',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '활성화 상태',
    example: true,
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  status?: boolean = true;
}