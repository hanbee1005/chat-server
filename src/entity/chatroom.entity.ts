import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Member } from "./member.entity";
import { Role } from "./role.entity";

@Entity('chatroom')
export class Chatroom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 20 })
    name: string;

    @ManyToOne(() => Member, {
        eager: false
    })
    @JoinColumn({name: 'creator', referencedColumnName: 'id'})
    creator: Member;

    @Column({name: 'creator', readonly: true})
    creatorId: number

    @ManyToMany(() => Role, {cascade: ['insert']})
    @JoinTable({
        name: 'chatroom_role',
        joinColumn: {
            name: 'chatroom',
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

    constructor(name: string, creator: Member) {
        this.name = name
        this.creator = creator
    }
}