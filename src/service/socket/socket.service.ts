import { Server } from 'socket.io';
import { RedisAdapter } from './redis.adapter';

export const SocketService = (...args: ConstructorParameters<typeof Server>) => {
  // socket server 생성
  const io = new Server(...args);
  RedisAdapter(io); // socket.io redis-adapter 연결

  const RoomHandler = require('../socket/handler/room.handler');
  const ChatHandler = require('../socket/handler/chat.handler');

  io.use((socket, next) => {
    // 여기서 로그인 및 세션 확인...?
    console.log(socket.handshake.auth.token);
    next();
  });

  io.on('connection', (socket) => {
    console.log(`[connection] ${socket.id}`);

    socket.on('greeting', (greeting: string) => {
      console.log(`${socket.id} greeting ${greeting}!!!`);
      socket.broadcast.emit('greeting', greeting);
    });

    RoomHandler(io, socket);
    ChatHandler(io, socket);
  });
};
