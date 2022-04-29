import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V1Module } from './v1/v1.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from './response/response.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService, ResponseService],
})
export class AppModule {}
