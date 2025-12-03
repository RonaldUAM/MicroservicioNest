import { Controller, Post, Get, Param, Body, Put, Patch } from '@nestjs/common';
import { PatientsService } from '../services/patients.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { Patient } from '../model/patient.entity';

@Controller('patients')
export class PatientsController {
  constructor(private svc: PatientsService) {}

  @Post()
  create(@Body() dto: CreatePatientDto) {
    const patient: Partial<Patient> = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      birthDate: new Date(dto.birthDate),
      gender: dto.gender as 'Male' | 'Female' | 'Other',
    };
    return this.svc.create(patient);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreatePatientDto>) {
    const updates: Partial<Patient> = {};
    if (dto.firstName !== undefined) updates.firstName = dto.firstName;
    if (dto.lastName !== undefined) updates.lastName = dto.lastName;
    if (dto.birthDate !== undefined)
      updates.birthDate = new Date(dto.birthDate);
    if (dto.gender !== undefined)
      updates.gender = dto.gender as 'Male' | 'Female' | 'Other';
    return this.svc.update(id, updates);
  }

  @Patch(':id/status')
  deactivate(@Param('id') id: string) {
    return this.svc.deactivate(id);
  }
}
