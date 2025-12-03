import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PatientsController } from './controllers/patients.controller';
import { PatientsService } from './services/patients.service';
import { Patient } from './model/patient.entity';
import { TumorType } from './model/tumortype.entity';
import { ClinicalRecord } from './model/clinicalrecord.entity';
import { TumorTypesController } from './controllers/tumortypes.controller';
import { TumorTypesService } from './services/tumortypes.service';
import { ClinicalRecordsController } from './controllers/clinicalrecords.controller';
import { ClinicalRecordsService } from './services/clinicalrecords.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '3306', 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Patient, TumorType, ClinicalRecord],
        synchronize: false,
        logging: configService.get<string>('NODE_ENV') !== 'production',
      }),
    }),
    TypeOrmModule.forFeature([Patient, TumorType, ClinicalRecord]),
  ],
  controllers: [
    AppController,
    PatientsController,
    TumorTypesController,
    ClinicalRecordsController,
  ],
  providers: [
    AppService,
    PatientsService,
    TumorTypesService,
    ClinicalRecordsService,
  ],
})
export class AppModule {}
