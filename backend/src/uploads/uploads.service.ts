import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadRequest, UploadRequestDocument, UploadStatus } from '../schemas/upload-request.schema';
import { Lesson, LessonDocument } from '../schemas/lesson.schema';
import { Quiz, QuizDocument } from '../schemas/quiz.schema';
import { CreateUploadRequestDto } from './dto/upload.dto';

@Injectable()
export class UploadsService {
  constructor(
    @InjectModel(UploadRequest.name)
    private uploadRequestModel: Model<UploadRequestDocument>,
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
    @InjectModel(Quiz.name)
    private quizModel: Model<QuizDocument>,
  ) {}

  async createUploadRequest(createUploadDto: CreateUploadRequestDto, teacherId: string) {
    const uploadRequest = new this.uploadRequestModel({
      ...createUploadDto,
      teacherId,
    });

    return await uploadRequest.save();
  }

  async getPendingUploads() {
    return await this.uploadRequestModel.find({
      where: { status: UploadStatus.PENDING },
      relations: ['teacher'],
      order: { createdAt: 'ASC' },
    });
  }

  async approveUpload(uploadId: string, adminNotes?: string) {
    const upload = await this.uploadRequestModel.findOne({
      where: { id: uploadId },
    });

    if (!upload) {
      throw new NotFoundException('Upload request not found');
    }

    upload.status = UploadStatus.APPROVED;
    upload.adminNotes = adminNotes;
    
    await upload.save();

    // Create the actual lesson/quiz based on the upload type
    await this.processApprovedUpload(upload);

    return upload;
  }

  async rejectUpload(uploadId: string, adminNotes?: string) {
    const upload = await this.uploadRequestModel.findOne({
      where: { id: uploadId },
    });

    if (!upload) {
      throw new NotFoundException('Upload request not found');
    }

    upload.status = UploadStatus.REJECTED;
    upload.adminNotes = adminNotes;
    
    return await upload.save();
  }

  private async processApprovedUpload(upload: UploadRequest) {
    const metadata = upload.metadata;

    switch (upload.type) {
      case 'video':
        // Create lesson with video
        const lesson = new this.lessonModel({
          title: metadata.title,
          description: metadata.description,
          youtubeId: metadata.youtubeId,
          courseId: metadata.courseId,
          order: metadata.order,
          pdfUrl: metadata.pdfUrl,
          isPublished: true,
        });

        const savedLesson = await lesson.save();

        // Create quiz if provided
        if (metadata.quiz) {
          const quiz = new this.quizModel({
            questions: metadata.quiz.questions,
            passingScore: metadata.quiz.passingScore || 70,
            lesson: savedLesson,
          });
          await quiz.save();
        }
        break;

      // Handle other upload types as needed
      default:
        break;
    }
  }
}
