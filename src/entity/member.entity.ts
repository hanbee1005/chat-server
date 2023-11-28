import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { Role } from './role.entity';
import { Address } from './address.entity';

@Entity('member')
export class Member {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 20 })
  name: string;

  @Column('varchar', { length: 4, nullable: true })
  mbti: string;

  @OneToMany(() => Address, address => address.member, { cascade: ['insert'] })
  addresses: Address[];

  @ManyToMany(() => Role, { cascade: ['insert'] })
  @JoinTable({
    name: 'member_role',
    joinColumn: {
      name: 'member',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @CreateDateColumn()
  createdAt: Timestamp;

  constructor(name: string, mbti?: string) {
    this.name = name;
    if (mbti) this.mbti = mbti;
  }
}
