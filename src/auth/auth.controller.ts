import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserToCreateDto, UserToLogDto } from 'src/users/users.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { EPrismaError } from 'src/types/prisma.types';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly jwtService: JwtService,
  ) {}

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
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === EPrismaError.UniqueConstraint)
          throw new ConflictException('El usuario ya existe.');
      }
      throw error;
    }
  }

  @Post('signin')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signin(@Body() payload: UserToLogDto) {
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
  }
}
