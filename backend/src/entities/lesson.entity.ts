import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Course } from './course.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column()
  youtubeId: string;

  @Column()
  order: number;

  @Column({ nullable: true })
  pdfUrl: string;

  @Column({ default: false })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Course, course => course.lessons)
  course: Course;

  @Column()
  courseId: string;

  @OneToOne(() => Quiz, quiz => quiz.lesson)
  @JoinColumn()
  quiz: Quiz;
}