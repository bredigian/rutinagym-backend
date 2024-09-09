import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService, PrismaService],
})
export class ExerciseModule {}
