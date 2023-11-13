import { Server } from "socket.io";

module.exports = (io: Server) => {
    const sendToRoom = (roomId: string) => {
        console.log(`${roomId}`);
    }

    const broadcast = () => {

    }

    return {
        sendToRoom,
        broadcast
    }
}