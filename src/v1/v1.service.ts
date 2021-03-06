import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateV1Dto } from './dto/create-v1.dto';
import { UpdateV1Dto } from './dto/update-v1.dto';
import { PayloadV1Dto } from './dto/payload-v1.dto';
import { ServicesV1 } from './entities/services-v1.entity';
import { RecordsV1 } from './entities/records-v1.entity';
import { ResponseService } from '../response/response.service';

@Injectable()
export class V1Service {
  constructor(
    @InjectRepository(ServicesV1)
    public servicesRepository: Repository<ServicesV1>,
    @InjectRepository(RecordsV1)
    public recordsRepository: Repository<RecordsV1>,
    private connection: Connection,
    private readonly responseService: ResponseService,
  ) {}

  // not in use
  create(createV1Dto: CreateV1Dto) {
    return 'This action adds a new v1';
  }

  // take a payload, calculate latency time, stone to database.
  async payload(id: string, PayloadV1Dto: PayloadV1Dto) {
    // edge case 1
    if (id != PayloadV1Dto.id) {
      return this.responseService.BadRequest(
        'id in request parameter is different from id in request body.',
      );
    }
    // find the service
    let service = await this.servicesRepository.findOne(id);

    // edge case 2
    if (!service) {
      return this.responseService.BadRequest(`Service #${id} does not exist.`);
    }

    // edge case 3
    if (service.serviceName != PayloadV1Dto.serviceName) {
      return this.responseService.BadRequest(
        `Service #${id} - '${PayloadV1Dto.serviceName}' does not exist. Do you mean '${service.serviceName}'?`,
      );
    }

    let startTime = new Date().getTime();

    // check payload, if no payload then 400.
    if (!PayloadV1Dto.payload) {
      service.totalHttp400 += 1;
      service.totalRequestServed += 1;
      const queryRunner = this.connection.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        await queryRunner.manager.save(service);
        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
        return this.responseService.Error();
      } finally {
        await queryRunner.release();
        return this.responseService.BadRequest('No payload.');
      }
    }

    // do factorial calculation
    let ret = this.factorial(PayloadV1Dto.payload.length);

    // to make the time long
    // for (let i = 1; i < 250000; ++i) {
    //   this.factorial(PayloadV1Dto.payload.length);
    //   this.factorial(PayloadV1Dto.payload.length);
    //   this.factorial(PayloadV1Dto.payload.length);
    //   this.factorial(PayloadV1Dto.payload.length);
    //   this.factorial(PayloadV1Dto.payload.length);
    // }

    let epochTime = new Date();

    // millionseconds latency
    let latency = epochTime.getTime() - startTime;

    // create and save data
    service.maxLatency = Math.max(service.maxLatency, latency);
    service.totalRequestServed += 1;
    if (latency > 4000) {
      service.totalHttp502 += 1;
    } else {
      service.totalHttp200 += 1;
    }

    let record = new RecordsV1();
    record.payload = PayloadV1Dto.payload;
    record.latency = latency;
    record.epochTime = epochTime;
    record.serviceId = service.id;

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(service);
      await queryRunner.manager.save(record);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return this.responseService.Error('Database Error');
    } finally {
      await queryRunner.release();
      return this.responseService.Response(
        latency > 4000 ? 502 : 200,
        record,
        latency > 4000 ? 'Heavy payload' : 'Add payload successful.',
      );
    }
  }

  // not in use
  findAll() {
    return this.servicesRepository.find();
  }

  // not in use
  findOne(id: number) {
    return `This action returns a #${id} v1`;
  }

  async findAggregate(time: number) {
    let records = await this.recordsRepository.find({
      order: {
        epochTime: 'ASC',
      },
    });
    let ret = [];
    let temp: RecordsV1[] = [];
    for (let record of records) {
      if (temp.length == 0) {
        temp.push(record);
        continue;
      }
      if (
        record.epochTime.getTime() - temp[0].epochTime.getTime() >
        time * 60 * 1000
      ) {
        ret.push(temp);
        temp = [record];
      } else {
        temp.push(record);
      }
    }
    if (temp.length != 0) {
      ret.push(temp);
    }
    return this.responseService.Success(
      ret,
      `Aggregated data in ${time} mins interval.`,
    );
  }

  createData() {
    // create initial data
    let ser1 = new ServicesV1('Service 1');
    ser1.totalRequestServed = 2;
    ser1.totalHttp200 = 2;
    ser1.maxLatency = 300;
    let ser2 = new ServicesV1('Service 2');
    ser2.totalRequestServed = 1;
    ser2.totalHttp200 = 1;
    ser2.maxLatency = 200;

    let record1 = new RecordsV1();
    record1.payload = 'This is some payload for payload 1.';
    record1.service = ser1;
    record1.epochTime = new Date();
    record1.latency = 100;

    let record2 = new RecordsV1();
    record2.payload = 'This is some payload for payload 2.';
    record2.service = ser2;
    record2.epochTime = new Date();
    record2.latency = 200;

    let record3 = new RecordsV1();
    record3.payload = 'This is some payload for payload 3.';
    record3.service = ser1;
    record3.epochTime = new Date();
    record3.latency = 300;

    let ret = this.createMany([ser1, ser2], [record1, record2, record3]);
    return ret;
  }

  // find the infomation about a certain service
  async findOneServiceInfo(id: number) {
    let service = await this.servicesRepository.findOne(id);
    if (!service) {
      return this.responseService.BadRequest('No such service');
    }
    return this.responseService.Success(service);
  }

  // not in use
  update(id: number, updateV1Dto: UpdateV1Dto) {
    return `This action updates a #${id} v1`;
  }

  // not in use
  remove(id: number) {
    return `This action removes a #${id} v1`;
  }

  removeAll() {
    // cannot clear because dependencies
    // this.servicesRepository.clear();
    return { code: 400 };
  }

  factorial(len: number) {
    if (len == 0 || len == 1) {
      return 1;
    }
    return len * this.factorial(len - 1);
  }

  async createMany(services: ServicesV1[], records: RecordsV1[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(services[0]);
      await queryRunner.manager.save(services[1]);
      await queryRunner.manager.save(records[0]);
      await queryRunner.manager.save(records[1]);
      await queryRunner.manager.save(records[2]);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return { code: 400 };
    } finally {
      await queryRunner.release();
      return { code: 200 };
    }
  }
}
