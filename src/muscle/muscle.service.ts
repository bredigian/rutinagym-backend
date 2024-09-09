import { Injectable } from '@nestjs/common';
import { MuscleToCreateDto } from './muscle.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class MuscleService {
  constructor(private prisma: PrismaService) {}

  async getGroups() {
    return await this.prisma.muscle.findMany();
  }

  async createGroup(payload: MuscleToCreateDto) {
    return await this.prisma.muscle.create({ data: payload });
  }
}
