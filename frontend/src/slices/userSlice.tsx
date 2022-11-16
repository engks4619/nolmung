import Geolocation from '@react-native-community/geolocation';
import {AnyAction, createSlice, Dispatch} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userInfoType} from '~/utils/type';

const initialState = {
  userIdx: 0,
  phone: '',
  nickname: '',
  profileImage: '',
  accessToken: '',
  lat: 0,
  lng: 0,
};

export const getLocation = (dispatch: Dispatch<AnyAction>) => {
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

export const storeUserInfo = async (
  userInfo: userInfoType,
  dispatch: Dispatch<AnyAction>,
) => {
  try {
    await AsyncStorage.setItem('accessToken', userInfo.accessToken);
    dispatch(setUser(userInfo));
  } catch (error) {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userIdx = action.payload.userIdx;
      state.phone = action.payload.phone;
      state.nickname = action.payload.nickname;
      state.profileImage = action.payload.profileImage;
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
