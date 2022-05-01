import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from './response.service';

describe('ResponseService', () => {
  let service: ResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseService],
    }).compile();

    service = module.get<ResponseService>(ResponseService);
  });

  it('Should return a response json object', () => {
    expect(
      service.Response(301, { res: 'redirection' }, 'redirection'),
    ).toStrictEqual({
      code: 301,
      data: { res: 'redirection' },
      message: 'redirection',
    });
  });

  it('Should return success json object', () => {
    expect(service.Success({ res: 'yes' }, 'yes')).toStrictEqual({
      code: 200,
      data: { res: 'yes' },
      message: 'yes',
    });
  });

  it('Should return error json object', () => {
    expect(service.Error('error')).toStrictEqual({
      code: 500,
      message: 'error',
      data: {}
    });
  });

  it('Should return bad request json object', () => {
    expect(service.BadRequest('bad request')).toStrictEqual({
      code: 400,
      message: 'bad request',
      data: {}
    });
  });
});
