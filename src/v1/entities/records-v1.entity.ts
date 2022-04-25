import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ServicesV1 } from './services-v1.entity';

@Entity()
export class RecordsV1 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    payload: string;

    @Column({type: "timestamptz", default: new Date()})
    epochTime: Date;

    @Column()
    latency: number;

    @ManyToOne(type => ServicesV1, service => service.records)
    service: ServicesV1;

}
