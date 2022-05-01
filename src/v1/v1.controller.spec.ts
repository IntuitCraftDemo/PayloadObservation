import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicesV1 } from './entities/services-v1.entity';
import { V1Controller } from './v1.controller';
import { V1Service } from './v1.service';

describe('V1Controller', () => {
  let controller: V1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [V1Controller],
      providers: [
        V1Service,
        // {
        //   provide: getRepositoryToken(ServicesV1),
        //   useValue: mockRepository,
        // }
      ],
    }).compile();

    controller = module.get<V1Controller>(V1Controller);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  // describe('Find All', () => {
  //   it('should return all services', () => {
  //     var all = controller.findAll();
  //     console.log(all);
  //     expect(all).toBe('yes');
  //   });
  // });
});
