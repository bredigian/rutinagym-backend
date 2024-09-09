import {
  Body,
  Controller,
  Get,
  Post,
  ServiceUnavailableException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { MuscleService } from './muscle.service';
import { MuscleToCreateDto } from './muscle.dto';

@Controller('muscles')
export class MuscleController {
  constructor(private readonly service: MuscleService) {}

  @Get()
  async getGroups() {
    try {
      return await this.service.getGroups();
    } catch (e) {
      console.error(e);
      throw new ServiceUnavailableException(
        'No se ha podido establecer conexión con la base de datos.',
      );
    }
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async registerGroup(@Body() payload: MuscleToCreateDto) {
    try {
      return await this.service.createGroup(payload);
    } catch (e) {
      console.error(e);
      throw new ServiceUnavailableException(
        'No se ha podido establecer conexión con la base de datos.',
      );
    }
  }
}
