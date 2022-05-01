import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from '../response/response.service';
import { Connection, Repository } from 'typeorm';
import { RecordsV1 } from './entities/records-v1.entity';
import { ServicesV1 } from './entities/services-v1.entity';
import { V1Service } from './v1.service';

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
      providers: [
        V1Service,
        ResponseService,
      ],
    }).compile();

    service = module.get<V1Service>(V1Service);
    serviceRepo = module.get<Repository<ServicesV1>>(getRepositoryToken(ServicesV1));
    recordRepo = module.get<Repository<RecordsV1>>(getRepositoryToken(RecordsV1));
    connection = await module.get(getConnectionToken());
  });

  afterAll(async () =>{
    await connection.close();
  })

  describe('Find All', () => {
    it('should return all services', () => {
      //var all = service.findAll();
      //console.log(all);
      //expect(all).toHaveLength(2);
    });
  });
});
