import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from '../schemas/lesson.schema';
import { Quiz, QuizDocument } from '../schemas/quiz.schema';
import { QuizSubmission, QuizSubmissionDocument } from '../schemas/quiz-submission.schema';
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
    const lesson = await this.lessonModel.findById(lessonId).populate('quiz');

    if (!lesson || !lesson.quiz) {
      throw new NotFoundException('Lesson or quiz not found');
    }

    // Check if user has access to this course
    const user = await this.userModel.findById(userId).populate({
      path: 'coursesUnlocked',
      model: 'Course'
    });

    const hasAccess = user.coursesUnlocked.some(course => course._id.toString() === lesson.courseId.toString());
    if (!hasAccess) {
      throw new ForbiddenException('You do not have access to this course');
    }

    // Calculate score
    const correctAnswers = (lesson.quiz as any)?.questions.map(q => q.correctAnswer);
    let correctCount = 0;
    
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / (lesson.quiz as any)?.questions.length) * 100);
    const passed = score >= (lesson.quiz as any)?.passingScore;

    // Save submission
    const submission = new this.quizSubmissionModel({
      studentId: userId,
      quiz: (lesson.quiz as any)?._id,
      answers,
      score,
      passed,
    });

    await submission.save();

    return {
      score,
      passed,
      correctAnswers: correctCount,
      totalQuestions: (lesson.quiz as any)?.questions.length,
    };
  }
}
