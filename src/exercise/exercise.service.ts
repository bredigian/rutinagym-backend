import { ExerciseToCreateDto } from './exercise.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.excercise.findMany({
      include: { muscle: { select: { name: true } } },
    });
  }

  async createExercise(payload: ExerciseToCreateDto) {
    return await this.prisma.excercise.create({ data: payload });
  }
}
