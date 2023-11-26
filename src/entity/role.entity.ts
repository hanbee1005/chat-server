import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp} from "typeorm";

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 20 })
    name: 'ADMIN' | 'MEMBER';

    @CreateDateColumn()
    createdAt: Timestamp;

    constructor(name: 'ADMIN' | 'MEMBER') {
        this.name = name
    }
}