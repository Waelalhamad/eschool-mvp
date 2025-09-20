import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';

@ApiTags('Courses')
@Controller('courses')
@UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth()
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Get unlocked courses for student' })
  @Roles(UserRole.STUDENT)
  async getUnlockedCourses(@Request() req) {
    return await this.coursesService.getUnlockedCourses(req.user.id);
  }

  @Get(':id/lessons')
  @ApiOperation({ summary: 'Get lessons for a course' })
  @Roles(UserRole.STUDENT)
  async getCourseLessons(@Param('id') courseId: string, @Request() req) {
    return await this.coursesService.getCourseLessons(courseId, req.user.id);
  }
}