import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { Lesson } from '../entities/lesson.entity';
import { Course } from '../entities/course.entity';
import { Quiz } from '../entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Course, Quiz])],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
