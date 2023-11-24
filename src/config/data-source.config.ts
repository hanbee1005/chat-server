import { DataSource } from 'typeorm';
import { Member } from '@/entity/member.entity';
import { Chatroom } from '@/entity/chatroom.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'test123',
  database: 'chat',
  synchronize: false,
  logging: true,
  entities: ['src/entity/*.ts'],
});
