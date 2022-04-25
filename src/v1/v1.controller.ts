import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { V1Service } from './v1.service';
import { CreateV1Dto } from './dto/create-v1.dto';
import { UpdateV1Dto } from './dto/update-v1.dto';
import { PayloadV1Dto } from './dto/payload-v1.dto';

@Controller('v1')
export class V1Controller {
  constructor(private readonly v1Service: V1Service) {}

  @Post()
  create(@Body() createV1Dto: CreateV1Dto) {
    return this.v1Service.create(createV1Dto);
  }

  @Post(':id/data')
  payload(@Param('id') id: string, @Body() PayloadV1Dto: PayloadV1Dto) {
    return this.v1Service.payload(id, PayloadV1Dto);
  }

  @Get()
  findAll() {
    return this.v1Service.findAll();
  }

  @Get('create_data')
  createData(){
    return this.v1Service.createData();
  }

  @Get('info')
  findAllServiceInfo(){
    return this.v1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.v1Service.findOne(+id);
  }

  @Get(':id/info')
  findOneServiceInfo(@Param('id') id: string) {
    return this.v1Service.findOneServiceInfo(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateV1Dto: UpdateV1Dto) {
    return this.v1Service.update(+id, updateV1Dto);
  }

  @Delete('delete_all')
  removeAll(){
    return this.v1Service.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.v1Service.remove(+id);
  }
}
