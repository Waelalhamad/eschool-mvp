import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate('coursesUnlocked');
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user;
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      updateProfileDto,
      { new: true }
    );
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user;
  }

  async getProfile(id: string) {
    const user = await this.findById(id);
    
    // Don't return sensitive information
    const { passwordHash, ...profile } = user;
    
    return {
      ...profile,
      totalCoursesUnlocked: user.coursesUnlocked?.length || 0,
    };
  }
}
