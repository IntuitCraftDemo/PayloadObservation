import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from '../response/response.service';
import { Connection } from 'typeorm';
import { RecordsV1 } from './entities/records-v1.entity';
import { ServicesV1 } from './entities/services-v1.entity';
import { V1Controller } from './v1.controller';
import { V1Service } from './v1.service';
import { PayloadV1Dto } from './dto/payload-v1.dto';

describe('V1Controller', () => {
  let controller: V1Controller;
  let connection: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [V1Controller],
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

    controller = module.get<V1Controller>(V1Controller);
    connection = await module.get(getConnectionToken());
  });

  afterAll(async () => {
    await connection.close();
  });

  // Detailed blackbox test see postman
  describe('Find One', () => {
    it('should return service 1', async () => {
      let ser = await controller.findOneServiceInfo('1');
      expect(ser.data['id']).toBe(1);
    });
  });

  // Detailed blackbox test see postman
  describe('Add empty payload to database', () => {
    it('shoud return 400', async () => {
      let pld = new PayloadV1Dto();
      pld.id = '1';
      pld.serviceName = 'Service 1';

      let ser = await controller.payload('1', pld);
      expect(ser.code).toBe(400);
    });
  });
});
