import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  watchId: undefined,
  isSaving: false,
  isLogging: false,
  myPosition: null,
  startDate: null,
  lastUpdate: null,
  path: [],
};

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
      state.myPosition = action.payload.myPosition;
    },
    resetStates(state) {
      Object.assign(state, initialState);
    },
    setWatchId(state, action) {
      state.watchId = action.payload;
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
  setWatchId,
} = myPositionSlice.actions;
export default myPositionSlice;
