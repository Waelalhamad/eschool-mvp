import { Controller, Post, Body, Get, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UploadsService } from './uploads.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../schemas/user.schema';
import { CreateUploadRequestDto, ReviewUploadDto } from './dto/upload.dto';

@ApiTags('Uploads')
@Controller('uploads')
@UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth()
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit content for admin approval' })
  @Roles(UserRole.TEACHER)
  async createUploadRequest(@Body() createUploadDto: CreateUploadRequestDto, @Request() req) {
    return await this.uploadsService.createUploadRequest(createUploadDto, req.user.id);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending upload requests for review' })
  @Roles(UserRole.ADMIN)
  async getPendingUploads() {
    return await this.uploadsService.getPendingUploads();
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve an upload request' })
  @Roles(UserRole.ADMIN)
  async approveUpload(@Param('id') uploadId: string, @Body() reviewDto: ReviewUploadDto) {
    return await this.uploadsService.approveUpload(uploadId, reviewDto.adminNotes);
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject an upload request' })
  @Roles(UserRole.ADMIN)
  async rejectUpload(@Param('id') uploadId: string, @Body() reviewDto: ReviewUploadDto) {
    return await this.uploadsService.rejectUpload(uploadId, reviewDto.adminNotes);
  }
}