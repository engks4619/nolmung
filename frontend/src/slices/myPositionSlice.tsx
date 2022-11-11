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
  getMultiple,
} from '~/utils/AsyncService';
import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';
import {lastLogAlert} from '~/utils/FuctionsForMypostionSlice';

const initialState = {
  isSaving: false,
  isLogging: false,
  myPosition: null,
  path: [],
  dogs: [],
};
const localList = ['@StartDate', '@LastUpdate', '@WalkingLogs', '@Dogs'];

//이전 로그 전송 함수
// const saveLogs = async () => {
//   try {
//     const response: AxiosResponse = await axios.post('로그저장주소');
//     const data: DetailProps = response.data;
//     setDetailContent(data);
//   } catch (error: any) {
//     Alert.alert(
//       `에러코드 ${error.response.status}`,
//       '죄송합니다. 다시 시도해주시길 바랍니다.',
//     );
//   }
// };
//이전 로그 불러오기(로컬과 동기화)
const syncLogs = async () => {
  const results = await getMultiple([
    '@StartDate',
    '@LastUpdate',
    '@WalkingLogs',
    '@Dogs',
  ]);
  return;
};

//이전 로그 삭제
//로그 시작(더하기)
export const startWalking = async (
  navigation: any,
  dispatch: any,
  dogs: any,
  isLogging: boolean,
) => {
  // Redux Check
  // Local Check
  // Alert ask => page 띄우기 뒤로가기 누르면 Main으로 가겠지?
  // !!30분 언더 logView에서만 뒤로가기 막고 mapView로
  if (isLogging) {
    //watchPostion이 실행 중 => 아무 동작 없이 mapView만 띄울 것
  } else if (!isLogging) {
    // watchPosition이 중단 된 상태 => local 확인 해보고 판단
    const localStatus = await checkLocal();
    if (localStatus) {
      //alert (지난 비정상 기록 보실래요?)
      lastLogAlert(navigation, dispatch, localList);
    } else {
      //기록 시작
    }
  }
};

const checkLocal = async () => {
  const allKeys = await getAllKeys();
  const checkList = ['@StartDate', '@Dogs', '@LastUpdate']; // 두 값만 local에 있으면 산책 시작을 눌렀다는 뜻
  if (checkList.every(i => allKeys.includes(i))) {
    return true;
  } else {
    return false;
  }
};

//.toLocaleString('ko-KR')
export const checkLastUpdate = async () => {
  const loggedDate = new Date(await getData('@LastUpdate'));
  loggedDate.setHours(loggedDate.getMinutes() + 30);
  const currentDate = new Date();
  // 마지막 기록시간보다 30분 이상 지나 있을 때
  if (loggedDate >= currentDate) {
    return true;
  } // 30분 이내의 기내의 기록이 있을 때
  else {
    return false;
  }

  // Alert.alert(
  //   '진행 중 이던 산책이 있습니다. 이어 하시겠습니까?',
  //   '"새로하기" 선택시 이전 기록들은 삭제 됩니다',
  //   [
  //     {text:''}
  //   ]
  // )
}; //기록된 산책이 없다 or 기록 중 일부가 삭제 되었다 => 새로시작

export const startLogging = async (dispatch: any) => {
  dispatch(setIsLoggingOn());
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
      distanceFilter: 3,
    },
  );
};

const myPositionSlice = createSlice({
  name: 'myPosition',
  initialState,
  reducers: {
    setIsLoggingOn(state) {
      state.isLogging = true;
    },
    setMyPosition(state, action) {
      state.myPosition = action.payload;
    },
    addPath(state, action) {
      state.path = state.path.concat(action.payload);
    },
  },
  extraReducers: builder => {},
});

export const {setMyPosition, addPath, setIsLoggingOn} = myPositionSlice.actions;
export default myPositionSlice;
