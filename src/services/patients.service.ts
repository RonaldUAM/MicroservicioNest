import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { QueryFailedError } from 'typeorm';
import { Patient } from '../model/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private repo: Repository<Patient>,
  ) {}

  async create(dto: Partial<Patient>) {
    const id = uuidv4();
    const patient = this.repo.create({
      id,
      status: 'Activo',
      ...dto,
    } as Patient);
    return this.repo.save(patient);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, dto: Partial<Patient>) {
    const patient = await this.findOne(id);
    if (!patient) throw new NotFoundException('Patient not found');
    Object.assign(patient, dto);
    return this.repo.save(patient);
  }

  async deactivate(id: string) {
    const patient = await this.findOne(id);
    if (!patient) throw new NotFoundException('Patient not found');
    patient.status = 'Inactivo';
    try {
      return await this.repo.save(patient);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        // Provide a friendlier message for SQL errors (e.g., enum mismatch)
        throw new BadRequestException(
          `Database error while updating status: ${(err as any).message}`,
        );
      }
      throw err;
    }
  }
}
