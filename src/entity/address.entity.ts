import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp} from "typeorm";
import { Member } from "./member.entity";

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 6 })
    zipcode: string;

    @Column('varchar', { length: 20 })
    address: string;

    @ManyToOne(() => Member, (member) => member.addresses, { eager: false })
    member: Member

    @CreateDateColumn()
    createdAt: Timestamp;

    constructor(zipcode: string, address: string) {
        this.zipcode = zipcode;
        this.address = address;
    }
}