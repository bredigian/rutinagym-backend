import {
  Body,
  ConflictException,
  Controller,
  Get,
  Headers,
  NotFoundException,
  Post,
  ServiceUnavailableException,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { UserToCreateDto, UserToLogDto } from 'src/users/users.dto';

import { AuthService } from './auth.service';
import { EPrismaError } from 'src/types/prisma.types';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Version('1')
  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signup(@Body() payload: UserToCreateDto) {
    try {
      const user = await this.service.register(payload);

      const { id, username, email, first_name, last_name, role } = user;
      const access_token = await this.jwtService.signAsync({
        sub: id,
        username,
        email,
        first_name,
        last_name,
        role,
      });

      return { access_token };
    } catch (e) {
      console.error(e);
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === EPrismaError.UniqueConstraint)
          throw new ConflictException('El usuario ya existe.');
      }
      throw new ServiceUnavailableException(
        'No se ha podido establecer conexión con la base de datos.',
      );
    }
  }

  @Version('1')
  @Post('signin')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signin(@Body() payload: UserToLogDto) {
    try {
      const user = await this.service.getUserByUsername(payload.username);
      if (!user) throw new NotFoundException('El usuario no existe.');

      const passwordMatch = await this.service.verifyPassword(
        payload.password,
        user.password,
      );
      if (!passwordMatch)
        throw new UnauthorizedException('Las credenciales son inválidas');

      const { id, username, email, first_name, last_name, role } = user;
      const access_token = await this.jwtService.signAsync({
        sub: id,
        username,
        email,
        first_name,
        last_name,
        role,
      });

      return { access_token };
    } catch (e) {
      console.error(e);
      if (e) throw e;
      throw new ServiceUnavailableException(
        'No se ha podido establecer conexión con la base de datos.',
      );
    }
  }

  @Version('1')
  @Get('validate')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async validateToken(@Headers('Authorization') token: string) {
    try {
      const isValid = await this.jwtService.verifyAsync(token.substring(7));
      if (!isValid)
        throw new UnauthorizedException('El token no es válido o ya caducó.');

      return isValid;
    } catch (e) {
      console.error(e);
      if (e) throw e;
      throw new ServiceUnavailableException(
        'No se ha podido establecer conexión con la base de datos.',
      );
    }
  }
}
