import {useCallback} from 'react';
import {io, Socket} from 'socket.io-client';

let socket: Socket | undefined;
const useSocket = (): [Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);
  if (!socket) {
    socket = io('http://nolmung.kr/api/socket', {
      transports: ['websocket'],
    });
    socket.on('connect', () => console.log('socket..connected'));
  }
  return [socket, disconnect];
};

let roomSocket: Socket | undefined;
export const useRoomSocket = (): [Socket | undefined, () => void] => {
  const roomDisconnect = useCallback(() => {
    if (roomSocket) {
      roomSocket.disconnect();
      roomSocket = undefined;
    }
  }, []);
  if (!roomSocket) {
    roomSocket = io('http://192.168.0.102:5000/room', {
      transports: ['websocket'],
    });
    roomSocket.on('connect', () => console.log('room...socket..connected'));
  }
  return [roomSocket, roomDisconnect];
};

export default useSocket;
