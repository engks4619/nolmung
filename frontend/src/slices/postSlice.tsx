import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  writerIdx: undefined,
  writerImg: '',
  writerName: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostInfo(state, action) {
      state.writerIdx = action.payload.writerIdx;
      state.writerImg = action.payload.userImgUrl;
      state.writerName = action.payload.writerName;
    },
  },
});

export const {setPostInfo} = postSlice.actions;
export default postSlice;
