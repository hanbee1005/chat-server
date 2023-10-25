import {Server} from "socket.io";
import { RedisAdapter } from "./redis.adapter";

const sessions = new Map<string, number>();

export const SocketService = (
    ...args: ConstructorParameters<typeof Server>
) => {

    // socket server 생성
    const io = new Server(...args);
    RedisAdapter(io);  // socket.io redis-adapter 연결

    io.on('connection', socket => {
        console.log(`[connection] ${socket.id}`)

        // login: 소캣 연결 후 user id 연결
        socket.on('login', (userId: number) => {
            console.log(`user ${userId} connect socket ${socket.id}`)
            sessions.set(socket.id, userId)
        })

        // room:create - 방 만들기
        socket.on('room:create', (roomName: string) => {

        })

        // room:leave - 방에서 나가기
        socket.on('room:leave', (roomId: number) => {

        })

        // chat:send - 채팅 보내기
        socket.on('chat:send', (message: string) => {

        })
    })
}