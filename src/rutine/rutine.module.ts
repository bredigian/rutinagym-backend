import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { RutineController } from './rutine.controller';
import { RutineService } from './rutine.service';

@Module({
  controllers: [RutineController],
  providers: [RutineService, PrismaService],
})
export class RutineModule {}
