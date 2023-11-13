import {DataSource, DataSourceOptions} from "typeorm";
import {Member} from "@/entity/member.entity";
import { Chatroom } from "@/entity/chatroom.entity";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'chat',
    synchronize: false,
    logging: true,
    entities: [Member, Chatroom]
} as DataSourceOptions);