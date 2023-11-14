import { Server, Socket } from 'socket.io';

module.exports = (io: Server, socket: Socket) => {
  const sendToRoom = (roomId: string) => {
    console.log(`${roomId}`);

    // TODO 채팅 내용 DB 저장

    io.to(roomId).emit('chat:send', {});
  };

  const broadcast = () => {
    io.emit('chat:broadcast', {});
  };

  // chat:send - 채팅 보내기
  socket.on('chat:send', sendToRoom);
};
