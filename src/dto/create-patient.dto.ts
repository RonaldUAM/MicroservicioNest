import { IsString, IsDateString, IsIn } from 'class-validator';

export class CreatePatientDto {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsDateString() birthDate: string;
  @IsIn(['Male', 'Female', 'Other']) gender: string;
}
