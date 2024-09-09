import { Module } from '@nestjs/common';
import { MuscleController } from './muscle.controller';
import { MuscleService } from './muscle.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  providers: [MuscleService, PrismaService],
  controllers: [MuscleController],
})
export class MuscleModule {}
