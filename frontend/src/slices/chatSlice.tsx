import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  postIdx: undefined,
  postImage: '',
  subject: '',
  pay: undefined,
  writerIdx: undefined,
  oppentName: '',
  oppentImg: '',
  oppentIdx: undefined,
  categoryType: '',
};

const chatSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
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
    },
  },
});

export const {setChatPostInfo} = chatSlice.actions;
export default chatSlice;
