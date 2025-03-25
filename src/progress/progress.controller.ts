import { Body, Controller, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { UpdateProgressDto } from './dto/updateDTO.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post(':userId')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async updateProgress(
    @Param('userId') userId: string,
    @Body() updateProgressDto: UpdateProgressDto,
  ) {
    return this.progressService.updateProgress(userId, updateProgressDto);
  }
}
