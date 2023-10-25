import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Member } from "./member.entity";

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

    @CreateDateColumn()
    createdAt: Timestamp;

    constructor(name: string, creator: Member) {
        this.name = name
        this.creator = creator
    }
}