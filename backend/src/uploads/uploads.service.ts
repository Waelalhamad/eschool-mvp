import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadRequest, UploadStatus } from '../entities/upload-request.entity';
import { Lesson } from '../entities/lesson.entity';
import { Quiz } from '../entities/quiz.entity';
import { CreateUploadRequestDto } from './dto/upload.dto';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(UploadRequest)
    private uploadRequestRepository: Repository<UploadRequest>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async createUploadRequest(createUploadDto: CreateUploadRequestDto, teacherId: string) {
    const uploadRequest = this.uploadRequestRepository.create({
      ...createUploadDto,
      teacherId,
    });

    return await this.uploadRequestRepository.save(uploadRequest);
  }

  async getPendingUploads() {
    return await this.uploadRequestRepository.find({
      where: { status: UploadStatus.PENDING },
      relations: ['teacher'],
      order: { createdAt: 'ASC' },
    });
  }

  async approveUpload(uploadId: string, adminNotes?: string) {
    const upload = await this.uploadRequestRepository.findOne({
      where: { id: uploadId },
    });

    if (!upload) {
      throw new NotFoundException('Upload request not found');
    }

    upload.status = UploadStatus.APPROVED;
    upload.adminNotes = adminNotes;
    
    await this.uploadRequestRepository.save(upload);

    // Create the actual lesson/quiz based on the upload type
    await this.processApprovedUpload(upload);

    return upload;
  }

  async rejectUpload(uploadId: string, adminNotes?: string) {
    const upload = await this.uploadRequestRepository.findOne({
      where: { id: uploadId },
    });

    if (!upload) {
      throw new NotFoundException('Upload request not found');
    }

    upload.status = UploadStatus.REJECTED;
    upload.adminNotes = adminNotes;
    
    return await this.uploadRequestRepository.save(upload);
  }

  private async processApprovedUpload(upload: UploadRequest) {
    const metadata = upload.metadata;

    switch (upload.type) {
      case 'video':
        // Create lesson with video
        const lesson = this.lessonRepository.create({
          title: metadata.title,
          description: metadata.description,
          youtubeId: metadata.youtubeId,
          courseId: metadata.courseId,
          order: metadata.order,
          pdfUrl: metadata.pdfUrl,
          isPublished: true,
        });

        const savedLesson = await this.lessonRepository.save(lesson);

        // Create quiz if provided
        if (metadata.quiz) {
          const quiz = this.quizRepository.create({
            questions: metadata.quiz.questions,
            passingScore: metadata.quiz.passingScore || 70,
            lesson: savedLesson,
          });
          await this.quizRepository.save(quiz);
        }
        break;

      // Handle other upload types as needed
      default:
        break;
    }
  }
}
