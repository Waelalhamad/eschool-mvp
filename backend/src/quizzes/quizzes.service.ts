import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../entities/lesson.entity';
import { Quiz } from '../entities/quiz.entity';
import { QuizSubmission } from '../entities/quiz-submission.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(QuizSubmission)
    private quizSubmissionRepository: Repository<QuizSubmission>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
    const submission = this.quizSubmissionRepository.create({
      studentId: userId,
      quizId: lesson.quiz.id,
      answers,
      score,
      passed,
    });

    await this.quizSubmissionRepository.save(submission);

    return {
      score,
      passed,
      correctAnswers: correctCount,
      totalQuestions: lesson.quiz.questions.length,
    };
  }
}
