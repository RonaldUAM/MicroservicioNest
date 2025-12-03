import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../model/patient.entity';
import { TumorType } from './tumortype.entity';

@Entity('clinicalrecord')
export class ClinicalRecord {
  @PrimaryColumn('char', { length: 36 })
  id: string;

  @Column('char', { length: 36, nullable: true })
  patientId: string | null;

  @Column('int', { nullable: true })
  tumorTypeId: number | null;

  @Column('date')
  diagnosisDate: Date;

  @Column('enum', { enum: ['IA', 'IIA', 'IV'] })
  stage: 'IA' | 'IIA' | 'IV';

  @Column('text', { nullable: true })
  treatmentProtocol: string | null;

  @ManyToOne(() => Patient, { nullable: true })
  @JoinColumn({ name: 'patientId' })
  patient?: Patient;

  @ManyToOne(() => TumorType, { nullable: true })
  @JoinColumn({ name: 'tumorTypeId' })
  tumorType?: TumorType;
}
