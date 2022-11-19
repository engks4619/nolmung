import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  roomInfos: [],
  postIdx: undefined,
  postImage: '',
  subject: '',
  pay: undefined,
  writerIdx: undefined,
  oppentName: '',
  oppentImg: '',
  oppentIdx: undefined,
  categoryType: '',
  completed: undefined,
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
      state.writerIdx = action.payload.writerIdx;
      state.oppentIdx = action.payload.writerIdx;
      state.oppentImg = action.payload.userImgUrl;
      state.oppentName = action.payload.writer;
      state.categoryType = action.payload.categoryType;
      state.completed = action.payload.completed;
    },
    setCompleted(state, action) {
      state.completed = action.payload;
    },
  },
});

export const {setChatPostInfo, setCompleted, setRoomInfos} = chatSlice.actions;
export default chatSlice;
