import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from 'src/services/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService, PrismaService, HashService],
  controllers: [AuthController],
})
export class AuthModule {}
