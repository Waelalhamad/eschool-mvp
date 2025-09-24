import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course, CourseSchema } from '../schemas/course.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { Lesson, LessonSchema } from '../schemas/lesson.schema';
import { QuizSubmission, QuizSubmissionSchema } from '../schemas/quiz-submission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: User.name, schema: UserSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: QuizSubmission.name, schema: QuizSubmissionSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
