import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('patient')
export class Patient {
  @PrimaryColumn('char', { length: 36 })
  id: string; // UUID

  @Column('varchar', { length: 100 })
  firstName: string;

  @Column('varchar', { length: 100 })
  lastName: string;

  @Column('date')
  birthDate: Date;

  @Column('enum', { enum: ['Male', 'Female', 'Other'] })
  gender: 'Male' | 'Female' | 'Other';

  @Column('enum', { enum: ['Activo', 'Seguimiento', 'Inactivo'] })
  status: 'Activo' | 'Seguimiento' | 'Inactivo';
}
