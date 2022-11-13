import {useCallback} from 'react';
import {io, Socket} from 'socket.io-client';

let socket: Socket | undefined;
export const useSocket = (): [Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);
  if (!socket) {
    socket = io('http://192.168.0.102:5000', {
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

let chatSocket: Socket | undefined;
export const useChatSocket = (): [Socket | undefined, () => void] => {
  const chatDisconnect = useCallback(() => {
    if (chatSocket) {
      chatSocket.disconnect();
      chatSocket = undefined;
    }
  }, []);
  if (!chatSocket) {
    chatSocket = io('http://192.168.0.102:5000/chat', {
      transports: ['websocket'],
    });
    chatSocket.on('connect', () => console.log('chat...socket..connected'));
  }
  return [chatSocket, chatDisconnect];
};
