import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  ServiceUnavailableException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { RutineService } from './rutine.service';
import { RutineToCreateDto } from './rutine.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { EPrismaError } from 'src/types/prisma.types';
import { UUID } from 'crypto';

@Controller('rutine')
export class RutineController {
  constructor(private readonly service: RutineService) {}

  @Get(':id')
  async getAllByUserId(@Param() params: { id: UUID }) {
    try {
      const { id } = params;
      return await this.service.getAllByUserId(id);
    } catch (e) {
      console.error(e);
      throw new ServiceUnavailableException(
        'No se ha podido establecer conexión con la base de datos.',
      );
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async register(@Body() payload: RutineToCreateDto) {
    try {
      return await this.service.createRutine(payload);
    } catch (e) {
      console.error(e);
      if (e instanceof PrismaClientKnownRequestError)
        if (e.code === EPrismaError.ForeignKeyConstraint)
          throw new NotFoundException('El ID del usuario no está registrado.');
      throw new ServiceUnavailableException(
        'No se ha podido establecer conexión con la base de datos.',
      );
    }
  }
}
