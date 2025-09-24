import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type QuizDocument = Quiz & Document;

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ type: [Object], required: true })
  questions: QuizQuestion[];

  @Prop({ default: 70 })
  passingScore: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' })
  lessonId?: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);