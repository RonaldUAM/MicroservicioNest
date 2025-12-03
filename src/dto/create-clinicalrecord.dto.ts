import {
  IsString,
  IsDateString,
  IsIn,
  IsOptional,
  IsUUID,
  IsInt,
} from 'class-validator';

export class CreateClinicalRecordDto {
  @IsUUID()
  id: string;

  @IsUUID()
  @IsOptional()
  patientId?: string;

  @IsInt()
  @IsOptional()
  tumorTypeId?: number;

  @IsDateString()
  diagnosisDate: string;

  @IsIn(['IA', 'IIA', 'IV'])
  stage: string;

  @IsOptional()
  @IsString()
  treatmentProtocol?: string;
}
