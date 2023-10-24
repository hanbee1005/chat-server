import http from 'http';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import 'reflect-metadata';
import {AppDataSource} from "@/config/data-source.config";
import {SocketService} from "@/service/socket.service";

const app: Express = express()
    .use(express.json())
    .use(cors())
    .use(express.urlencoded({ extended: true }));

const port = 8080;

const httpServer = http.createServer(app);

app.get('/', (req: Request, res: Response) => {
    res.send('Typescript + Node.js + Express Server');
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
});