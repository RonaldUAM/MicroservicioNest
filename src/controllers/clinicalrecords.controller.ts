import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ClinicalRecordsService } from '../services/clinicalrecords.service';
import { CreateClinicalRecordDto } from '../dto/create-clinicalrecord.dto';

@Controller('clinicalrecords')
export class ClinicalRecordsController {
  constructor(private svc: ClinicalRecordsService) {}

  @Post()
  create(@Body() dto: CreateClinicalRecordDto) {
    return this.svc.create(dto as any);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.svc.findByPatient(patientId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateClinicalRecordDto>,
  ) {
    return this.svc.update(id, dto as any);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
