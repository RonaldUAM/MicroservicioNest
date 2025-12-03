import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TumorType } from '../model/tumortype.entity';

@Injectable()
export class TumorTypesService {
  constructor(
    @InjectRepository(TumorType)
    private repo: Repository<TumorType>,
  ) {}

  create(dto: Partial<TumorType>) {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, dto: Partial<TumorType>) {
    const t = await this.findOne(id);
    if (!t) throw new NotFoundException('TumorType not found');
    Object.assign(t, dto);
    return this.repo.save(t);
  }

  async remove(id: number) {
    const t = await this.findOne(id);
    if (!t) throw new NotFoundException('TumorType not found');
    return this.repo.remove(t);
  }
}
