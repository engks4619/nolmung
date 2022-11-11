import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  postIdx: undefined,
  postImage: '',
  subject: '',
  pay: undefined,
  writerIdx: undefined,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostInfo(state, action) {
      state.postIdx = action.payload.postIdx;
      state.postImage = action.payload.photoUrl[0];
      state.subject = action.payload.subject;
      state.writerIdx = action.payload.writerIdx;
      state.pay = action.payload?.pay;
    },
  },
});

export const {setPostInfo} = postSlice.actions;
export default postSlice;
