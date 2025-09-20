import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from '../entities/coupon.entity';
import { User } from '../entities/user.entity';
import { Course } from '../entities/course.entity';
import { CreateCouponDto } from './dto/coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async redeemCoupon(code: string, userId: string) {
    const coupon = await this.couponRepository.findOne({
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

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['coursesUnlocked'],
    });

    // Add courses to user's unlocked courses
    const newCourses = coupon.allowedCourses.filter(
      course => !user.coursesUnlocked.some(uc => uc.id === course.id)
    );

    user.coursesUnlocked.push(...newCourses);
    await this.userRepository.save(user);

    // Increment usage count
    coupon.usedCount++;
    await this.couponRepository.save(coupon);

    return {
      message: 'Coupon redeemed successfully',
      unlockedCourses: newCourses,
    };
  }

  async createCoupon(createCouponDto: CreateCouponDto) {
    const { allowedCourseIds, ...couponData } = createCouponDto;
    
    const courses = await this.courseRepository.findByIds(allowedCourseIds);
    
    const coupon = this.couponRepository.create({
      ...couponData,
      allowedCourses: courses,
      expiresAt: createCouponDto.expiresAt ? new Date(createCouponDto.expiresAt) : null,
    });

    return await this.couponRepository.save(coupon);
  }

  async getAllCoupons() {
    return await this.couponRepository.find({
      relations: ['allowedCourses'],
      order: { createdAt: 'DESC' },
    });
  }
}