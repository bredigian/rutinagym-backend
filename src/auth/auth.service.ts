import { HashService } from 'src/services/hash.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { User } from '@prisma/client';
import { UserToCreateDto } from 'src/users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
  ) {}

  async register(payload: UserToCreateDto) {
    const hash = await this.hashService.generateHash(payload.password);
    return await this.prisma.user.create({
      data: { ...payload, password: hash },
    });
  }

  async getUserByUsername(username: User['username']) {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  async verifyPassword(password: string, hash: User['password']) {
    return await this.hashService.compareHash(password, hash);
  }
}
