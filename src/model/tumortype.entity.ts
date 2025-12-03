import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tumortype')
export class TumorType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  systemAffected: string;
}
