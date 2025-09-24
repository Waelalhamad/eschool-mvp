import { Controller, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { QuizzesService } from './quizzes.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../schemas/user.schema';
import { SubmitQuizDto } from './dto/quiz.dto';

@ApiTags('Quizzes')
@Controller('lessons')
@UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth()
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @Post(':id/quiz/submit')
  @ApiOperation({ summary: 'Submit quiz answers and get score' })
  @Roles(UserRole.STUDENT)
  async submitQuiz(
    @Param('id') lessonId: string,
    @Body() submitQuizDto: SubmitQuizDto,
    @Request() req,
  ) {
    return await this.quizzesService.submitQuiz(lessonId, submitQuizDto.answers, req.user.id);
  }
}