import {createSlice} from '@reduxjs/toolkit';
import {io, Socket} from 'socket.io-client';

const initialState = {
  socket: undefined,
  roomId: undefined,
  opponent: undefined,
};

const chatSlice = createSlice({
  name: 'chatInfo',
  initialState,
  reducers: {
    initSocket(state) {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = undefined;
      }
      const socket: Socket = io('http://172.17.96.1:5000', {
        transports: ['websocket'],
      });
      socket.on('connect', () => {
        console.log('connected');
      });
    },
  },
});

export const {initSocket} = chatSlice.actions;
export default chatSlice;
