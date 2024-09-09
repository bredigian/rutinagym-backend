import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  ServiceUnavailableException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ExerciseService } from './exercise.service';
import { ExerciseToCreateDto } from './exercise.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { EPrismaError } from 'src/types/prisma.types';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly service: ExerciseService) {}

  @Get()
  async getAll() {
    try {
      return await this.service.getAll();
    } catch {
      throw new ServiceUnavailableException(
        'No se ha podido establecer conexión con la base de datos.',
      );
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async register(@Body() payload: ExerciseToCreateDto) {
    try {
      return await this.service.createExercise(payload);
    } catch (e) {
      console.error(e);
      if (e instanceof PrismaClientKnownRequestError)
        if (e.code === EPrismaError.ForeignKeyConstraint)
          throw new BadRequestException(
            'El ID del grupo muscular no es válido.',
          );

      throw new ServiceUnavailableException(
        'No se ha podido establecer conexión con la base de datos.',
      );
    }
  }
}
