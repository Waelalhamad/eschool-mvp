import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class QuizSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json')
  answers: number[];

  @Column()
  score: number;

  @Column()
  passed: boolean;

  @CreateDateColumn()
  submittedAt: Date;

  @ManyToOne(() => User)
  student: User;

  @Column()
  studentId: string;

  @ManyToOne(() => Quiz, quiz => quiz.submissions)
  quiz: Quiz;

  @Column()
  quizId: string;
}