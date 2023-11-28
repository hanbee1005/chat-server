import http from 'http';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import 'reflect-metadata';
import {AppDataSource} from "@/config/data-source.config";
import {SocketService} from "@/service/socket/socket.service";
import { MemberService } from './service/member.service';

const app: Express = express()
    .use(express.json())
    .use(cors())
    .use(express.urlencoded({ extended: true }));

const port = process.env.port || 8080;

const httpServer = http.createServer(app);

const memberService = new MemberService();

app.get('/', (req: Request, res: Response) => {
    res.send('Typescript + Node.js + Express Server');
});

app.get('/users', async (req: Request, res: Response) => {
    const members = await memberService.findAll();
    console.log(members);
    res.send(members);
});

app.get('/rooms', async (req: Request, res: Response) => {

});

app.patch('/member', async (req: Request, res: Response) => {
    const request = req.body;
    const result = await memberService.updateMemberInfo(request);
    res.send(result);
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
    memberService.count().then(count => {
        if (count == 0) {
            memberService.saveAll([
                {name: 'son', role: 'ADMIN', addresses: [{zipcode: '12345', address: 'seoul'}]}, 
                {name: 'kang', role: 'MEMBER', addresses: [{zipcode: '67890', address: 'gyeongju'}]}, 
                {name: 'choi', role: 'MEMBER', addresses: [{zipcode: '54321', address: 'yangju'}]}
            ]);
        }
    });
});