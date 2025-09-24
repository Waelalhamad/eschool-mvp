import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { UploadType } from '../../schemas/upload-request.schema';

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