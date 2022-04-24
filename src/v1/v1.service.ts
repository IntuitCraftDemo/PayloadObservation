import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateV1Dto } from './dto/create-v1.dto';
import { UpdateV1Dto } from './dto/update-v1.dto';
import { PayloadV1Dto } from './dto/payload-v1.dto';
import { ServicesV1 } from './entities/services-v1.entity';


@Injectable()
export class V1Service {
  constructor(
    @InjectRepository(ServicesV1)
    private servicesRepository: Repository<ServicesV1>,
  ){}

  create(createV1Dto: CreateV1Dto) {
    return 'This action adds a new v1';
  }

  payload(id: string, PayloadV1Dto: PayloadV1Dto) {
    let startTime = new Date().getTime();

    // do factorial calculation
    let ret = this.factorial(PayloadV1Dto.payload.length);

    // to make the time long
    // for (let i = 1; i < 10000; ++i) {
    //   this.factorial(PayloadV1Dto.payload.length);
    //   this.factorial(PayloadV1Dto.payload.length);
    //   this.factorial(PayloadV1Dto.payload.length);
    //   this.factorial(PayloadV1Dto.payload.length);
    //   this.factorial(PayloadV1Dto.payload.length);
    // }

    let epochTime = new Date().getTime();
    let latency = epochTime - startTime;
    console.log(ret, latency);
    return this.servicesRepository.find()
    // return PayloadV1Dto;
  }

  findAll() {
    return `This action returns all v1`;
  }

  findOne(id: number) {
    return `This action returns a #${id} v1`;
  }

  findOneServiceInfo(id: number) {
    return `This action returns the #${id} service's info`;
  }

  update(id: number, updateV1Dto: UpdateV1Dto) {
    return `This action updates a #${id} v1`;
  }

  remove(id: number) {
    return `This action removes a #${id} v1`;
  }

  factorial(len: number) {
    if (len == 0 || len == 1) {
      return 1;
    }
    return len * this.factorial(len - 1);
  }
}
