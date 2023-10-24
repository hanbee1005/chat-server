import {Server} from "socket.io";

const sessions = new Map<string, number>();

export const SocketService = (
    ...args: ConstructorParameters<typeof Server>
) => {

    // socket server 생성
    const io = new Server(...args);

    io.on('connection', socket => {
        console.log(`[connection] ${socket.id}`)

        // login: 소캣 연결 후 user id 연결
        socket.on('login', (userId: number) => {
            console.log(`user ${userId} connect socket ${socket.id}`)
            sessions.set(socket.id, userId)
        })
    })
}