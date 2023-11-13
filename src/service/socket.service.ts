import {Server} from "socket.io";
import { RedisAdapter } from "./redis.adapter";

const sessions = new Map<string, number>();

export const SocketService = (
    ...args: ConstructorParameters<typeof Server>
) => {

    // socket server 생성
    const io = new Server(...args);
    RedisAdapter(io);  // socket.io redis-adapter 연결

    const { createRoom, selectRooms, leaveRoom } = require('../handler/RoomHandler')(io);
    const { sendToRoom } = require('../handler/ChatHandler')(io);

    io.use((socket, next) => {
        // 여기서 로그인 및 세션 확인...?
        next();
    });

    io.on('connection', socket => {
        console.log(`[connection] ${socket.id}`)

        // login: 소캣 연결 후 user id 연결
        socket.on('login', (userId: number) => {
            console.log(`user ${userId} connect socket ${socket.id}`)
            sessions.set(socket.id, userId)
        });

        // room:create - 방 만들기
        socket.on('room:create', createRoom);

        // room:list - 방 목록 조회
        socket.on('room:list', selectRooms)

        // room:leave - 방에서 나가기
        socket.on('room:leave', leaveRoom)

        // chat:send - 채팅 보내기
        socket.on('chat:send', sendToRoom)
    })
}