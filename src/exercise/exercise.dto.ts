import { IsOptional, IsString, IsUUID } from 'class-validator';

import { UUID } from 'crypto';

export class ExerciseToCreateDto {
  @IsOptional()
  @IsUUID()
  id?: UUID;

  @IsString()
  name: string;

  @IsUUID()
  muscle_id: UUID;

  @IsOptional()
  @IsUUID()
  preview_link?: UUID;
}
