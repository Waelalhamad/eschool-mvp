import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Quiz, QuizSchema } from '../schemas/quiz.schema';
import { QuizSubmission, QuizSubmissionSchema } from '../schemas/quiz-submission.schema';
import { Lesson, LessonSchema } from '../schemas/lesson.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: QuizSubmission.name, schema: QuizSubmissionSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: User.name, schema: UserSchema }
    ])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService],
})
export class QuizzesModule {}
