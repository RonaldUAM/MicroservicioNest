import { IsString } from 'class-validator';

export class CreateTumorTypeDto {
  @IsString()
  name: string;

  @IsString()
  systemAffected: string;
}
