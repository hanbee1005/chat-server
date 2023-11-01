import { Server } from "socket.io";

module.exports = (io: Server) => {
    const sendToRoom = (roomId: string) => {

    }

    const broadcast = () => {

    }

    return {
        sendToRoom,
        broadcast
    }
}