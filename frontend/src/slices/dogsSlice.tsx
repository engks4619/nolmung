import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dogsInfo: [],
  selectedDogsInfo: [],
};

const dogsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDogsInfo(state, action) {
      state.dogsInfo = action.payload;
    },
    setSelectedMyDogs(state, action) {
      state.selectedDogsInfo = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const {setDogsInfo, setSelectedMyDogs} = dogsSlice.actions;
export default dogsSlice;
