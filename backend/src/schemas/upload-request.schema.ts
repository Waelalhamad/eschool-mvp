import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UploadRequestDocument = UploadRequest & Document;

export enum UploadType {
  VIDEO = 'video',
  PDF = 'pdf',
  QUIZ = 'quiz',
}

export enum UploadStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class UploadRequest {
  @Prop({ required: true, enum: UploadType })
  type: UploadType;

  @Prop({ enum: UploadStatus, default: UploadStatus.PENDING })
  status: UploadStatus;

  @Prop({ type: Object, required: true })
  metadata: any;

  @Prop()
  adminNotes?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  teacherId: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export const UploadRequestSchema = SchemaFactory.createForClass(UploadRequest);

// Create indexes
UploadRequestSchema.index({ teacherId: 1 });
UploadRequestSchema.index({ status: 1 });