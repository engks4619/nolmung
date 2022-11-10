import {Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {createSlice} from '@reduxjs/toolkit';
import {Coord} from 'react-native-nmap';
import {
  storeData,
  getData,
  removeData,
  containsKey,
  getAllKeys,
} from '~/utils/AsyncService';
const initialState = {
  myPosition: null,
  path: [],
};

//.toLocaleString('ko-KR')
const initLog = async () => {
  const allKeys = await getAllKeys()
  const checkList = ['@StartDate','@LastUpdate','@WalkingLogs','@Dogs']
  // 지난 산책 기록이 있는가?
  if (checkList.every(i=>allKeys.includes(i))) {
    const loggedDate = new Date(await getData('@LastUpdate'));
    loggedDate.setHours(loggedDate.getMinutes() + 30);
    const currentDate = new Date();
    // 마지막 기록시간보다 30분 이상 지나 있을 때
    if (loggedDate >= currentDate) {
      Alert.alert(
        '지난 산책이 비정상 종료 되었습니다',
        '종료 후 30분이 지나 산책을 이어 하실 수 없어요',
        [
          {
            text: '새로시작',
            onPress:()=>{}, //저장X 새로시작
          },
          {
            text: '취소',
            onPress:()=>{},
          },
          {
            text: '저장 후 새로시작',
            onPress:()=>{}, // 저장 후 새로 시작
          }
        ],
        {cancelable: false},
      );
    } // 2시간 이내의 기내의 기록이 있을 때
    else {
      Alert.alert(
        '비정상 종료된 산책이 있습니다',
        '산책을 이어 하거나 새로운 산책을 시작 할 수 있어요',
        [
          {
            text: '이어하기',
            onPress: () => {},
          },
        ],
        {},
      );
    }

    // Alert.alert(
    //   '진행 중 이던 산책이 있습니다. 이어 하시겠습니까?',
    //   '"새로하기" 선택시 이전 기록들은 삭제 됩니다',
    //   [
    //     {text:''}
    //   ]
    // )
  } //기록된 산책이 없다 or 기록 중 일부가 삭제 되었다 => 새로시작
  else {
    console.log('awsdfasdf');
  }
};
//이전 로그 저장 함수
//이전 로그 삭제
//로그 시작(더하기)

export const startLogging = async (dispatch: any, dogs) => {
  await initLog();
  Geolocation.watchPosition(
    position => {
      const abc: Coord = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      dispatch(setMyPosition(abc));
      dispatch(addPath(abc));
    },
    error => {
      console.log(error);
    }, 
    {
      interval: 1000,
      enableHighAccuracy: true,
      timeout: 20000,
      distanceFilter: 5,
    },
  );
};

const myPositionSlice = createSlice({
  name: 'myPosition',
  initialState,
  reducers: {
    setMyPosition(state, action) {
      state.myPosition = action.payload;
    },
    addPath(state, action) {
      state.path = state.path.concat(action.payload);
    },
  },
  extraReducers: builder => {},
});

export const {setMyPosition, addPath} = myPositionSlice.actions;
export default myPositionSlice;
