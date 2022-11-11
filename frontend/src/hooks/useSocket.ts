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
    socket = io('http://172.17.96.1:5000/room', {
      transports: ['websocket'],
    });
    socket.on('connect', () => console.log('1'));
  }
  return [socket, disconnect];
};

export default useSocket;
