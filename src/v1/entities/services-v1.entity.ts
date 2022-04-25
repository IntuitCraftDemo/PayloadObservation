import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RecordsV1 } from './records-v1.entity';

@Entity()
export class ServicesV1 {
    constructor(serviceName){
        this.serviceName = serviceName;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serviceName: string;

    @Column({default: 0})
    totalRequestServed: number;

    @Column({default: 0})
    maxLatency: number;

    @Column({default: 0})
    totalHttp200: number;
    @Column({default: 0})
    totalHttp400: number;
    @Column({default: 0})
    totalHttp502: number;

    @OneToMany(type => RecordsV1, record => record.service, {eager:true})
    records: RecordsV1[];
}
