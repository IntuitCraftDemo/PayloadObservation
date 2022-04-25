import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ServicesV1 } from './entities/services-v1.entity';
import { mockConnection } from './mocks/mockConnection';
import { mockServicesRepository } from './mocks/mockServicesRepository';
import { V1Service } from './v1.service';

describe('V1Service', () => {
  let service: V1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        V1Service,
        {
          provide: getRepositoryToken(ServicesV1),
          useValue: mockServicesRepository,
        },
        {
          provide: Connection,
          useValue: mockConnection,
        },
      ],
    }).compile();

    service = module.get<V1Service>(V1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find All', () => {
    it('should return all services', () => {
      var mc = new mockServicesRepository();
      // console.log(mc.find());
      console.log(service.servicesRepository);
      var all = service.findAll();
      console.log(all);
      expect(all).toHaveLength(2);
    });
  });
});
