import http from 'http';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import 'reflect-metadata';
import {AppDataSource} from "@/config/data-source.config";
import {SocketService} from "@/service/socket.service";
import {Member} from "@/entity/member.entity";
import {MemberRepository} from "@/repository/member.repository";

const app: Express = express()
    .use(express.json())
    .use(cors())
    .use(express.urlencoded({ extended: true }));

const port = process.env.port || 8080;

const httpServer = http.createServer(app);

const memberRepository = new MemberRepository();

app.get('/', (req: Request, res: Response) => {
    res.send('Typescript + Node.js + Express Server');
});

app.get('/user', async (req: Request, res: Response) => {
    const members = await memberRepository.findAll();
    console.log(members)
    res.send(members);
});

app.get('/rooms', async (req: Request, res: Response) => {

});

// typeorm 초기화 후
AppDataSource.initialize().then(() => {
    // http server 를 socket.io server 로 upgrade
    SocketService(httpServer, {
        cors: {
            origin: '*',
            methods: '*',
        },
    });

    // http server 연결
    httpServer.listen(port, () => {
        console.log(`[server]: Server is running at <https://localhost>:${port}`);
    });

    // 초기 member 생성
    memberRepository.count().then(count => {
        if (count == 0) {
            memberRepository.saveAll([new Member('choi'), new Member('son'), new Member('kang')]);
        }
    })
});