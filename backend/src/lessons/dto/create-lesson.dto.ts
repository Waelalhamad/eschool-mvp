import { IsString, IsNotEmpty, IsOptional, IsNumber, IsMongoId, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty({ description: 'Lesson title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'Lesson description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'YouTube video ID' })
  @IsString()
  @IsNotEmpty()
  youtubeId: string;

  @ApiProperty({ description: 'Lesson order' })
  @IsNumber()
  order: number;

  @ApiPropertyOptional({ description: 'PDF URL' })
  @IsString()
  @IsOptional()
  pdfUrl?: string;

  @ApiPropertyOptional({ description: 'Is lesson published' })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({ description: 'Course ID' })
  @IsMongoId()
  @IsNotEmpty()
  courseId: string;
}