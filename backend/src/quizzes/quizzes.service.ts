import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from '../schemas/lesson.schema';
import { Quiz, QuizDocument } from '../schemas/quiz.schema';
import { QuizSubmission, QuizSubmissionDocument } from '../schemas/quizsubmission.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
    @InjectModel(Quiz.name)
    private quizModel: Model<QuizDocument>,
    @InjectModel(QuizSubmission.name)
    private quizSubmissionModel: Model<QuizSubmissionDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async submitQuiz(lessonId: string, answers: number[], userId: string) {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      relations: ['quiz', 'course'],
    });

    if (!lesson || !lesson.quiz) {
      throw new NotFoundException('Lesson or quiz not found');
    }

    // Check if user has access to this course
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['coursesUnlocked'],
    });

    const hasAccess = user.coursesUnlocked.some(course => course.id === lesson.course.id);
    if (!hasAccess) {
      throw new ForbiddenException('You do not have access to this course');
    }

    // Calculate score
    const correctAnswers = lesson.quiz.questions.map(q => q.correctAnswer);
    let correctCount = 0;
    
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / lesson.quiz.questions.length) * 100);
    const passed = score >= lesson.quiz.passingScore;

    // Save submission
    const submission = new this.quizSubmissionModel({
      studentId: userId,
      quizId: lesson.quiz.id,
      answers,
      score,
      passed,
    });

    await submission.save();

    return {
      score,
      passed,
      correctAnswers: correctCount,
      totalQuestions: lesson.quiz.questions.length,
    };
  }
}
