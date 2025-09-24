import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { Coupon, CouponSchema } from '../schemas/coupon.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { Course, CourseSchema } from '../schemas/course.schema';

@Module({
  imports: [MongooseModule.forFeature([
      { name: Coupon.name, schema: CouponSchema },
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema }
    ])],
  controllers: [CouponsController],
  providers: [CouponsService],
  exports: [CouponsService],
})
export class CouponsModule {}
