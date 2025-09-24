import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../schemas/course.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { Lesson, LessonDocument } from '../schemas/lesson.schema';
import { QuizSubmission, QuizSubmissionDocument } from '../schemas/quizsubmission.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<CourseDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
    @InjectModel(QuizSubmission.name)
    private quizSubmissionModel: Model<QuizSubmissionDocument>,
  ) {}

  async getUnlockedCourses(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['coursesUnlocked'],
    });

    return user.coursesUnlocked.filter(course => course.isActive);
  }

  async getCourseLessons(courseId: string, userId: string) {
    // Check if user has access to this course
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['coursesUnlocked'],
    });

    const hasAccess = user.coursesUnlocked.some(course => course.id === courseId);
    if (!hasAccess) {
      throw new ForbiddenException('You do not have access to this course');
    }

    // Get all lessons for the course
    const lessons = await this.lessonRepository.find({
      where: { courseId, isPublished: true },
      relations: ['quiz'],
      order: { order: 'ASC' },
    });

    // Get user's quiz submissions to determine progress
    const submissions = await this.quizSubmissionRepository.find({
      where: { studentId: userId },
      relations: ['quiz', 'quiz.lesson'],
    });

    // Mark lessons as unlocked based on quiz completion
    const lessonsWithProgress = lessons.map((lesson, index) => {
      const submission = submissions.find(sub => sub.quiz.lesson.id === lesson.id);
      const isPassed = submission?.passed || false;
      
      // First lesson is always unlocked, others require previous lesson completion
      const isUnlocked = index === 0 || 
        (index > 0 && submissions.some(sub => 
          lessons[index - 1].quiz && 
          sub.quiz.id === lessons[index - 1].quiz.id && 
          sub.passed
        ));

      return {
        ...lesson,
        isUnlocked,
        quizPassed: isPassed,
        userScore: submission?.score || null,
      };
    });

    return lessonsWithProgress;
  }
}
