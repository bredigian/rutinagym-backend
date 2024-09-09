import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { $Enums } from '@prisma/client';
import { UUID } from 'crypto';

export class UserToCreateDto {
  @IsOptional()
  @IsUUID()
  id?: UUID;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsEnum($Enums.Role)
  role: $Enums.Role;
}

export class UserToLogDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
