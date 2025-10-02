import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  youtubeId: string;

  @Prop({ required: true })
  order: number;

  @Prop()
  pdfUrl?: string;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
  courseId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' })
  quiz?: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

// Create indexes
LessonSchema.index({ courseId: 1 });
LessonSchema.index({ order: 1 });
LessonSchema.index({ isPublished: 1 });