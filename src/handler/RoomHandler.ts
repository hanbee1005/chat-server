import { Server } from "socket.io";

module.exports = (io: Server) => {
    const createRoom = (roomName: string) => {

    }

    const joinRoom = (roomId: string) => {

    }

    const selectRooms = () => {

    }

    const leaveRoom = (roomId: string) => {

    }

    const deleteRoom = (roomId: string) => {

    }

    return {
        createRoom,
        joinRoom,
        selectRooms,
        leaveRoom,
        deleteRoom
    }
}