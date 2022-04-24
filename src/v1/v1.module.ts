import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { V1Service } from './v1.service';
import { V1Controller } from './v1.controller';
import { ServicesV1 } from './entities/services-v1.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ServicesV1])],
  controllers: [V1Controller],
  providers: [V1Service]
})
export class V1Module {}
