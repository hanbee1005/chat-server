import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp} from "typeorm";

@Entity('member')
export class Member {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 20 })
    name: string;

    @CreateDateColumn()
    createdAt: Timestamp;

    constructor(name: string) {
        this.name = name
    }
}