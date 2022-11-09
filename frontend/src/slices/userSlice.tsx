import Geolocation from '@react-native-community/geolocation';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  lat: 0,
  lng: 0,
};

export const getLocation = (dispatch: any) => {
  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      dispatch(setLocation({lat: latitude, lng: longitude}));
    },
    error => {
      //에러처리
      console.log('geo에러!', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
    },
  );
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
    setLocation(state, action) {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
  extraReducers: builder => {},
});

export const {setUser, setLocation} = userSlice.actions;
export default userSlice;
