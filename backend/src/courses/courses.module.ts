import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from '../entities/course.entity';
import { User } from '../entities/user.entity';
import { Lesson } from '../entities/lesson.entity';
import { QuizSubmission } from '../entities/quiz-submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User, Lesson, QuizSubmission])],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
