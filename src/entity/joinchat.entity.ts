import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Chatroom } from "./chatroom.entity";
import { Member } from "./member.entity";

@Entity('joinchat')
export class JoinChat {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Chatroom)
    @JoinColumn({name: 'room_id'})
    room: Chatroom

    @ManyToOne(() => Member)
    @JoinColumn({name: 'member_id'})
    member: Member
    
    @CreateDateColumn()
    createdAt: Timestamp;
}