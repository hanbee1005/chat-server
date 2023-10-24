import {Server} from "socket.io";

export const SocketService = (
    ...args: ConstructorParameters<typeof Server>
) => {

    // socket server 생성
    const io = new Server(...args);

    io.on('connection', socket => {
        console.log(`[connection] ${socket.id}`)
    })
}