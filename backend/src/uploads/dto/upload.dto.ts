import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { UploadType } from '../../entities/upload-request.entity';

export class CreateUploadRequestDto {
  @IsEnum(UploadType)
  type: UploadType;

  @IsObject()
  metadata: any;
}

export class ReviewUploadDto {
  @IsOptional()
  @IsString()
  adminNotes?: string;
}