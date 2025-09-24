import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type CouponDocument = Coupon & Document;

@Schema({ timestamps: true })
export class Coupon {
  @Prop({ required: true })
  code: string;

  @Prop()
  usageLimit?: number;

  @Prop({ default: 0 })
  usedCount: number;

  @Prop()
  expiresAt?: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] })
  allowedCourses: mongoose.Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);

// Create indexes
CouponSchema.index({ code: 1 }, { unique: true });
CouponSchema.index({ isActive: 1 });