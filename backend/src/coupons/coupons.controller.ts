import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CouponsService } from './coupons.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../schemas/user.schema';
import { RedeemCouponDto, CreateCouponDto } from './dto/coupon.dto';

@ApiTags('Coupons')
@Controller('coupons')
@UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth()
export class CouponsController {
  constructor(private couponsService: CouponsService) {}

  @Post('redeem')
  @ApiOperation({ summary: 'Redeem a coupon to unlock courses' })
  @Roles(UserRole.STUDENT)
  async redeemCoupon(@Body() redeemCouponDto: RedeemCouponDto, @Request() req) {
    return await this.couponsService.redeemCoupon(redeemCouponDto.code, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new coupon' })
  @Roles(UserRole.ADMIN)
  async createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return await this.couponsService.createCoupon(createCouponDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all coupons with usage stats' })
  @Roles(UserRole.ADMIN)
  async getAllCoupons() {
    return await this.couponsService.getAllCoupons();
  }
}