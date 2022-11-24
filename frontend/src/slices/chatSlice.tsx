import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  roomInfos: [],
  postIdx: undefined,
  postImage: '',
  subject: '',
  pay: undefined,
  isWriter: false,
  oppentName: '',
  oppentImg: '',
  oppentIdx: undefined,
};

const chatSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setRoomInfos(state, action) {
      state.roomInfos = action.payload;
    },
    setChatPostInfo(state, action) {
      state.postIdx = action.payload.postIdx;
      state.postImage = action.payload.thumbnailUrl;
      state.subject = action.payload.subject;
      state.pay = action.payload?.pay;
      state.isWriter = action.payload.isWriter;
      state.oppentIdx = action.payload.oppentIdx;
      state.oppentImg = action.payload.oppentImg;
      state.oppentName = action.payload.oppentName;
    },
  },
});

export const {setChatPostInfo, setCompleted, setRoomInfos} = chatSlice.actions;
export default chatSlice;
