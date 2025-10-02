import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon, CouponDocument } from '../schemas/coupon.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { Course, CourseDocument } from '../schemas/course.schema';
import { CreateCouponDto } from './dto/coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectModel(Coupon.name)
    private couponModel: Model<CouponDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Course.name)
    private courseModel: Model<CourseDocument>,
  ) {}

  async redeemCoupon(code: string, userId: string) {
    const coupon = await this.couponModel.findOne({
      where: { code, isActive: true },
      relations: ['allowedCourses'],
    });

    if (!coupon) {
      throw new NotFoundException('Invalid or expired coupon');
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      throw new BadRequestException('Coupon has expired');
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      throw new BadRequestException('Coupon usage limit exceeded');
    }

    const user = await this.userModel.findOne({
      where: { id: userId },
      relations: ['coursesUnlocked'],
    });

    // Add courses to user's unlocked courses
    const newCourses = coupon.allowedCourses.filter(
      course => !user.coursesUnlocked.some(uc => uc._id.toString() === course._id.toString())
    );

    user.coursesUnlocked.push(...newCourses);
    await user.save();

    // Increment usage count
    coupon.usedCount++;
    await coupon.save();

    return {
      message: 'Coupon redeemed successfully',
      unlockedCourses: newCourses,
    };
  }

  async createCoupon(createCouponDto: CreateCouponDto) {
    const { allowedCourseIds, ...couponData } = createCouponDto;
    
    const courses = await this.courseModel.find({ _id: { $in: allowedCourseIds } });
    
    const coupon = new this.couponModel({
      ...couponData,
      allowedCourses: courses,
      expiresAt: createCouponDto.expiresAt ? new Date(createCouponDto.expiresAt) : null,
    });

    return await coupon.save();
  }

  async getAllCoupons() {
    return await this.couponModel.find({
      relations: ['allowedCourses'],
      order: { createdAt: 'DESC' },
    });
  }
}