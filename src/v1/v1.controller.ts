import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe, Render } from '@nestjs/common';
import { V1Service } from './v1.service';
import { CreateV1Dto } from './dto/create-v1.dto';
import { UpdateV1Dto } from './dto/update-v1.dto';
import { PayloadV1Dto } from './dto/payload-v1.dto';

@Controller('v1')
export class V1Controller {
  constructor(private readonly v1Service: V1Service) {}

  // not in use
  @Post()
  create(@Body() createV1Dto: CreateV1Dto) {
    return this.v1Service.create(createV1Dto);
  }

  @Post(':id/data')
  payload(@Param('id') id: string, @Body() PayloadV1Dto: PayloadV1Dto) {
    return this.v1Service.payload(id, PayloadV1Dto);
  }

  // not in use
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

  @Get('aggregate')
  @Render('aggregate')
  findAggregate(@Query('time', new DefaultValuePipe(5),ParseIntPipe) time: number){
    return this.v1Service.findAggregate(time);
  }

  // not in use
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.v1Service.findOne(+id);
  }

  @Get(':id/info')
  findOneServiceInfo(@Param('id') id: string) {
    return this.v1Service.findOneServiceInfo(+id);
  }

  // not in use
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateV1Dto: UpdateV1Dto) {
    return this.v1Service.update(+id, updateV1Dto);
  }

  // not in use
  @Delete('delete_all')
  removeAll(){
    return this.v1Service.removeAll();
  }

  // not in use
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.v1Service.remove(+id);
  }
}
