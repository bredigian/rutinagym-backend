import { IsOptional, IsString, IsUUID } from 'class-validator';

import { UUID } from 'crypto';

export class MuscleToCreateDto {
  @IsOptional()
  @IsUUID()
  id?: UUID;

  @IsString()
  name: string;
}
