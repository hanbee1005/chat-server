import { Server, Socket } from 'socket.io';

module.exports = (io: Server, socket: Socket) => {
  const createRoom = (roomName: string) => {
    // TODO 새로운 방을 생성하고 해당 방의 정보를 전달

    socket.emit('room:create', {});
    socket.broadcast.emit('room:list', {});
  };

  const joinRoom = (roomId: string) => {
    // TODO room 여부 확인 및 DB 참석자 추가

    socket.join(roomId);

    socket.emit('room:join', {});
    socket.to(roomId).emit('room:join-member', {});
  };

  const selectRooms = () => {
    // TODO room 목록을 db에서 조회하여 반환

    socket.emit('room:list', {});
  };

  const leaveRoom = (roomId: string) => {
    // TODO room 여부 확인 및 DB 참석자 제거

    socket.leave(roomId);

    socket.emit('room:leave', {});
    socket.to(roomId).emit('room:leave-member', {});
  };

  const deleteRoom = (roomId: string) => {
    // TODO 방이 삭제될 수 있는지 확인 및 DB 삭제

    socket.emit('room:delete', {});
  };

  // room:create - 방 만들기
  socket.on('room:create', createRoom);

  // room:list - 방 목록 조회
  socket.on('room:list', selectRooms);

  // room:leave - 방에서 나가기
  socket.on('room:leave', leaveRoom);
};
