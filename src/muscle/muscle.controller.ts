import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { MuscleService } from './muscle.service';
import { MuscleToCreateDto } from './muscle.dto';

@Controller('muscle')
export class MuscleController {
  constructor(private readonly service: MuscleService) {}

  @Get()
  async getGroups() {
    try {
      return await this.service.getGroups();
    } catch {
      throw new InternalServerErrorException(
        'No se ha podido establecer conexión con la base de datos.',
      );
    }
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async registerGroup(@Body() payload: MuscleToCreateDto) {
    try {
      return await this.service.createGroup(payload);
    } catch {
      throw new InternalServerErrorException(
        'No se ha podido establecer conexión con la base de datos.',
      );
    }
  }
}
