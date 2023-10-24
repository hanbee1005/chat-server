import http from 'http';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import 'reflect-metadata';

const app: Express = express()
    .use(express.json())
    .use(cors())
    .use(express.urlencoded({ extended: true }));

const port = 8080;

const httpServer = http.createServer(app);

app.get('/', (req: Request, res: Response) => {
    res.send('Typescript + Node.js + Express Server');
});

httpServer.listen(port, () => {
    console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
