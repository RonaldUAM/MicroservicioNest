import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicalRecord } from '../model/clinicalrecord.entity';
import { v4 as uuidv4 } from 'uuid';
import { Patient } from '../model/patient.entity';
import { TumorType } from '../model/tumortype.entity';

@Injectable()
export class ClinicalRecordsService {
  constructor(
    @InjectRepository(ClinicalRecord)
    private repo: Repository<ClinicalRecord>,
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
    @InjectRepository(TumorType)
    private tumorTypeRepo: Repository<TumorType>,
  ) {}

  async create(dto: Partial<ClinicalRecord>) {
    const id = dto.id ?? uuidv4();

    // Validate patient exists if patientId provided
    if (dto.patientId) {
      const patient = await this.patientRepo.findOne({
        where: { id: dto.patientId },
      });
      if (!patient) {
        throw new BadRequestException(
          `Patient with id ${dto.patientId} not found`,
        );
      }
    }

    // Validate tumor type exists if tumorTypeId provided
    if (dto.tumorTypeId) {
      const tumorType = await this.tumorTypeRepo.findOne({
        where: { id: dto.tumorTypeId },
      });
      if (!tumorType) {
        throw new BadRequestException(
          `TumorType with id ${dto.tumorTypeId} not found`,
        );
      }
    }

    const e = this.repo.create({ ...dto, id } as any);
    return this.repo.save(e);
  }

  findAll() {
    return this.repo.find({ relations: ['patient', 'tumorType'] });
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['patient', 'tumorType'],
    });
  }

  async update(id: string, dto: Partial<ClinicalRecord>) {
    const r = await this.findOne(id);
    if (!r) throw new NotFoundException('ClinicalRecord not found');
    Object.assign(r, dto);
    return this.repo.save(r);
  }

  async remove(id: string) {
    const r = await this.findOne(id);
    if (!r) throw new NotFoundException('ClinicalRecord not found');
    return this.repo.remove(r);
  }

  findByPatient(patientId: string) {
    return this.repo.find({ where: { patientId }, relations: ['tumorType'] });
  }
}
