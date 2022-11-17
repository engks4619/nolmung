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
    initRoom(state, action) {},
  },
});

export const {initSocket} = chatSlice.actions;
export default chatSlice;
