import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  // watchId: undefined,
  // isSaving: false,
  // isLogging: false,
  // myPosition: null,
  // startDate: null,
  // lastUpdate: null,
  path: [],
  dogs: [],
  second: 0,
  distance: 0,
  intervalId: '',
};

const watcherSlice = createSlice({
  name: 'watcher',
  initialState,
  reducers: {
    setPath(state, action) {
      state.path = action.payload.path;
    },
    setDogs(state, action) {
      state.dogs = action.payload.dogs;
    },
    // setIsLoggingOn(state) {
    //   state.isLogging = true;
    // },
    // setIsLoggingOff(state) {
    //   state.isLogging = false;
    // },
    // setIsSavingOn(state) {
    //   state.isSaving = true;
    // },
    // setIsSavingOff(state) {
    //   state.isSaving = false;
    // },

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
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setSecond(state, action) {
      state.second = action.payload;
    },
    addDistance(state, action) {
      state.distance = state.distance + action.payload;
    },
    setLastUpdate(state, action) {
      state.lastUpdate = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const {
  setPath,
  setDogs,
  setMyPosition,
  setIsLoggingOn,
  setIsLoggingOff,
  addPath,
  setStates,
  resetStates,
  setIsSavingOn,
  setIsSavingOff,
  setWatchId,
  setStartDate,
  setLastUpdate,
  setSecond,
  addDistance,
} = watcherSlice.actions;
export default watcherSlice;
