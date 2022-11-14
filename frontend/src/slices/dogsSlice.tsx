import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dogsInfo: [],
};

const dogsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDogsInfo(state, action) {
      state.dogsInfo = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const {setDogsInfo} = dogsSlice.actions;
export default dogsSlice;
