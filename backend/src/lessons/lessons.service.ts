import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from '../schemas/lesson.schema';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const lesson = new this.lessonModel(createLessonDto);
    return await lesson.save();
  }

  async findAll(): Promise<Lesson[]> {
    return await this.lessonModel.find().populate('courseId').exec();
  }

  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(id).populate('courseId').exec();

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonModel.findByIdAndUpdate(
      id,
      updateLessonDto,
      { new: true }
    ).populate('courseId').exec();

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return lesson;
  }

  async remove(id: string): Promise<void> {
    const lesson = await this.lessonModel.findByIdAndDelete(id).exec();
    
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
  }
}