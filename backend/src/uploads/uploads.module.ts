import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { UploadRequest, UploadRequestSchema } from '../schemas/uploadrequest.schema';
import { Lesson, LessonSchema } from '../schemas/lesson.schema';
import { Quiz, QuizSchema } from '../schemas/quiz.schema';

@Module({
  imports: [MongooseModule.forFeature([
      { name: UploadRequest.name, schema: UploadRequestSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: Quiz.name, schema: QuizSchema }
    ])],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService],
})
export class UploadsModule {}
