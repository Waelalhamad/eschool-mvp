import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type QuizSubmissionDocument = QuizSubmission & Document;

@Schema({ timestamps: true })
export class QuizSubmission {
  @Prop({ type: [Number], required: true })
  answers: number[];

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  passed: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  studentId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true })
  quiz: mongoose.Types.ObjectId;

  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const QuizSubmissionSchema = SchemaFactory.createForClass(QuizSubmission);

// Create indexes
QuizSubmissionSchema.index({ studentId: 1 });
QuizSubmissionSchema.index({ quiz: 1 });