import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { RutineToCreateDto } from './rutine.dto';
import { UUID } from 'crypto';

@Injectable()
export class RutineService {
  constructor(private prisma: PrismaService) {}

  async getAllByUserId(id: UUID) {
    return this.prisma.rutine.findMany({
      where: { user_id: id },
      include: { RutineExercise: true },
    });
  }

  async createRutine(payload: RutineToCreateDto) {
    const { user_id, start, end, RutineExercise } = payload;

    return await this.prisma.rutine.create({
      data: { user_id, start, end, RutineExercise: { create: RutineExercise } },
    });
  }
}
