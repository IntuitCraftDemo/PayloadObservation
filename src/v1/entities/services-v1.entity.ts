import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ServicesV1 {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serviceName: string;
}
