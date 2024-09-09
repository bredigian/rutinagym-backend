import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  ServiceUnavailableException,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';

import { RutineService } from './rutine.service';
import { RutineToCreateDto } from './rutine.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { EPrismaError } from 'src/types/prisma.types';
import { UUID } from 'crypto';

@Controller('rutines')
export class RutineController {
  constructor(private readonly service: RutineService) {}

  @Version('1')
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

  @Version('1')
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

  @Version('1')
  @Delete()
  async deleteById(@Query() query: { id: UUID }) {
    try {
      const { id } = query;
      if (!id)
        throw new BadRequestException('El ID de la rutina es requerido.');

      return await this.service.deleteById(id);
    } catch (e) {
      console.error(e);
      throw new ServiceUnavailableException(
        'No se ha podido establecer conexión con la base de datos.',
      );
    }
  }
}
