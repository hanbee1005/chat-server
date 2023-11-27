import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Timestamp} from "typeorm";
import { Role } from "./role.entity";

@Entity('member')
export class Member {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 20 })
    name: string;

    @Column('varchar', { length: 4, nullable: true })
    mbti: string;

    @ManyToMany(() => Role, {cascade: ['insert']})
    @JoinTable({
        name: 'member_role',
        joinColumn: {
            name: 'member',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'role',
            referencedColumnName: 'id'
        }
    })
    roles: Role[];

    @CreateDateColumn()
    createdAt: Timestamp;

    constructor(name: string, roles: Role[]) {
        this.name = name;
        this.roles = roles;
    }
}