import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Progress } from 'src/entities/progress.entities';
import { Repository } from 'typeorm';
import { UpdateProgressDto } from './dto/updateDTO.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
  ) {}

  async updateProgress(userId: string, updateProgressDto: UpdateProgressDto) {
    return this.progressRepository.manager.transaction(async (manager) => {
      const progress = await manager.findOne(Progress, { where: { userId } });
      if (progress) {
        // Apply optimistic locking
        if (progress.version !== updateProgressDto.version) {
          throw new ConflictException('Progress has been updated by another user');
        }
        progress.completedLessons = updateProgressDto.completedLessons;
        
        const savedProgress = await manager.save(progress);
        return {
          statusCode: 200,
          message: "Progress updated successfully",
          data: savedProgress
        }
      } else {
        const newProgress = manager.create(Progress, {
          userId,
          ...updateProgressDto,
        });
        const createdProgress = await manager.save(newProgress);
        return {
          statusCode: 201,
          message: "Progress created successfully",
          data: createdProgress
        }
      }
    });
  }
}
