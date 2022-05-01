import { Test, TestingModule } from '@nestjs/testing';
import {
  getConnectionToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { ResponseService } from '../response/response.service';
import { Connection, Repository } from 'typeorm';
import { RecordsV1 } from './entities/records-v1.entity';
import { ServicesV1 } from './entities/services-v1.entity';
import { V1Service } from './v1.service';
import { PayloadV1Dto } from './dto/payload-v1.dto';

describe('V1Service', () => {
  let module: TestingModule;
  let service: V1Service;
  let serviceRepo: Repository<ServicesV1>;
  let recordRepo: Repository<RecordsV1>;
  let connection: Connection;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'yiweizhu',
          password: '123456',
          database: 'test',
          entities: [RecordsV1, ServicesV1],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([ServicesV1, RecordsV1]),
      ],
      providers: [V1Service, ResponseService],
    }).compile();

    service = module.get<V1Service>(V1Service);
    serviceRepo = module.get<Repository<ServicesV1>>(
      getRepositoryToken(ServicesV1),
    );
    recordRepo = module.get<Repository<RecordsV1>>(
      getRepositoryToken(RecordsV1),
    );
    connection = await module.get(getConnectionToken());
  });

  afterAll(async () => {
    await connection.close();
  });

  // Detailed blackbox test see postman
  describe('Find One', () => {
    it('should return service 1', async () => {
      let ser = await service.findOneServiceInfo(1);
      expect(ser.data['id']).toBe(1);
    });
  });

  // Detailed blackbox test see postman
  describe('Add empty payload to database', () => {
    it('shoud return 400', async () => {
      let pld = new PayloadV1Dto();
      pld.id = '1';
      pld.serviceName = 'Service 1';

      let ser = await service.payload('1', pld);
      expect(ser.code).toBe(400);
    });
  });
});
