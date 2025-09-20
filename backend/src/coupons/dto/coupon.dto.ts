import { IsString, IsOptional, IsNumber, IsDateString, IsArray, IsUUID } from 'class-validator';

export class RedeemCouponDto {
  @IsString()
  code: string;
}

export class CreateCouponDto {
  @IsString()
  code: string;

  @IsOptional()
  @IsNumber()
  usageLimit?: number;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsArray()
  @IsUUID(4, { each: true })
  allowedCourseIds: string[];
}