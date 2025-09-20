import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { Lesson } from './lesson.entity';
import { QuizSubmission } from './quiz-submission.entity';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json')
  questions: QuizQuestion[];

  @Column({ default: 70 })
  passingScore: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Lesson, lesson => lesson.quiz)
  lesson: Lesson;

  @OneToMany(() => QuizSubmission, submission => submission.quiz)
  submissions: QuizSubmission[];
}