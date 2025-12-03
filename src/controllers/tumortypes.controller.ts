import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TumorTypesService } from '../services/tumortypes.service';
import { CreateTumorTypeDto } from '../dto/create-tumor-type.dto';

@Controller('tumortypes')
export class TumorTypesController {
  constructor(private svc: TumorTypesService) {}

  @Post()
  create(@Body() dto: CreateTumorTypeDto) {
    return this.svc.create(dto as any);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(parseInt(id, 10));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateTumorTypeDto>) {
    return this.svc.update(parseInt(id, 10), dto as any);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(parseInt(id, 10));
  }
}
