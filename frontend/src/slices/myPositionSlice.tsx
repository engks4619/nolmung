import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
  isLogging: false,
  myPosition: null,
  startDate: null,
  lastUpdate: null,
  path: [],
  dogs: [
    {dogName: '멍멍이1', breedCodeValue: '견종', image: 'imagePath'},
    {dogName: '멍멍이2', breedCodeValue: '견종', image: 'imagePath'},
  ],
};

//.toLocaleString('ko-KR')
const myPositionSlice = createSlice({
  name: 'myPosition',
  initialState,
  reducers: {
    setIsLoggingOn(state) {
      state.isLogging = true;
    },
    setIsSavingOn(state) {
      state.isSaving = true;
    },
    setIsSavingOff(state) {
      state.isSaving = false;
    },
    setMyPosition(state, action) {
      state.myPosition = action.payload;
    },
    addPath(state, action) {
      state.path = state.path.concat(action.payload);
    },
    setStates(state, action) {
      state.startDate = action.payload.startDate;
      state.lastUpdate = action.payload.lastUpdate;
      state.path = action.payload.walkingLogs;
      state.dogs = action.payload.dogs;
    },
    resetStates(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {},
});

export const {
  setMyPosition,
  setIsLoggingOn,
  addPath,
  setStates,
  resetStates,
  setIsSavingOn,
  setIsSavingOff,
} = myPositionSlice.actions;
export default myPositionSlice;
