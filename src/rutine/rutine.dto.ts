import { IsArray, IsDateString, IsOptional, IsUUID } from 'class-validator';

import { RutineExercise } from '@prisma/client';
import { UUID } from 'crypto';

export class RutineToCreateDto {
  @IsOptional()
  @IsUUID()
  id?: UUID;

  @IsUUID()
  user_id: UUID;

  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;

  @IsArray()
  RutineExercise: RutineExercise[];
}
