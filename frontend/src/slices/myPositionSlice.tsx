import {Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {createSlice} from '@reduxjs/toolkit';
import {Coord} from 'react-native-nmap';
import {
  storeData,
  getData,
  removeData,
  containsKey,
} from '~/utils/AsyncService';
const initialState = {
  myPosition: null,
  // path: [
  //   {latitude: 37.383, longitude: -122.0605},
  //   {latitude: 37.383, longitude: -122.0605},
  // ],
  path: [],
};

//.toLocaleString('ko-KR')
const initLog = async () => {
  // 지난 산책 기록이 있는가?
  if ((await containsKey('startDate')) && (await containsKey('walkingLog'))) {
    const loggedDate = new Date(await getData('startDate'));
    loggedDate.setHours(loggedDate.getHours() + 2);
    const currentDate = new Date();
    // 기록된 시간 +2시간 보다 지나있을 때
    if (loggedDate >= currentDate) {
      Alert.alert(
        '비정상 종료된 산책이 있습니다.',
        '산책 시작 2시간이 경과하여 종료 시점까지 자동 저장 되었어요',
        [
          {
            text: '확인',
          },
        ],
        {cancelable: true},
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
  } //기록된 산책이 없다
  else {
    console.log('awsdfasdf');
  }
};

export const startLogging = async (dispatch: any) => {
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
