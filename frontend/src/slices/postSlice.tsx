import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  postIdx: undefined,
  postImage: '',
  subject: '',
  pay: undefined,
  writerIdx: undefined,
  writerImg: '',
  writerName: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostInfo(state, action) {
      state.postIdx = action.payload.postIdx;
      state.postImage = action.payload.thumbnailUrl;
      state.subject = action.payload.subject;
      state.pay = action.payload?.pay;
      state.writerIdx = action.payload.writerIdx;
      state.writerImg = action.payload.userImgUrl;
      state.writerName = action.payload.writer;
    },
  },
});

export const {setPostInfo} = postSlice.actions;
export default postSlice;
