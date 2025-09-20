import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id },
      relations: ['coursesUnlocked'] 
    });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user;
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.findById(id);
    
    Object.assign(user, updateProfileDto);
    
    return await this.userRepository.save(user);
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
