import { Injectable } from '@nestjs/common';
import internal from 'stream';

@Injectable()
export class ResponseService {
  public Response(
    code: number = 200,
    data: object,
    message: string = 'Response',
  ) {
    return {
      code: code,
      message: message,
      data: data,
    };
  }
  public Success(data: object, message: string = 'Success') {
    return {
      code: 200,
      message: message,
      data: data,
    };
  }

  public Error(message: string = 'Server Error') {
    return {
      code: 500,
      message: message,
      data: {}
    };
  }

  public BadRequest(message: string = 'Bad Request') {
    return {
      code: 400,
      message: message,
      data: {}
    };
  }
}
