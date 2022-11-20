import {containsKey} from './AsyncService';
import {Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Coord} from 'react-native-nmap';
import {
  storeData,
  removeMultiple,
  getAllKeys,
  getData,
  getMultiple,
} from '~/utils/AsyncService';
import {
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
} from '~/slices/socketPositionSlice';
// import {setSelectedMyDogs} from '~/slices/dogsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const localList = [
  '@StartDateSocket',
  '@LastUpdateSocket',
  '@WalkingLogsSocket',
  '@DogsSocket',
];

export const startWalking = async (
  dispatch: any,
  navigation: any,
  socketPositionState: any,
  dogs: number[],
  locationSocket: any,
  user: number,
  roomId: string,
) => {
  const localIntended = await isIntended();
  if (socketPositionState.isLogging) {
    //watchPostion이 실행 중 => 아무 동작 없이 mapView만 띄울 것
    navigation.navigate('MapViewWorker');
  } else if (!socketPositionState.isLogging) {
    // watchPosition이 중단 된 상태 => local 확인 해보고 판단
    // if (!localIntended) {
    // local에는 존재 redux에는 없음 => 비정상 종료
    // lastLogAlert(navigation, dispatch, localList, dogs);
    // } else {
    // redux,local 둘다 없음 => 그냥 새로 시작
    locationSocket.emit('startWalk');
    startLogging(dispatch, dogs, locationSocket, user, roomId);
    navigation.navigate('MapViewWorker');
  }
};

export const startLogging = async (
  dispatch: any,
  dogs: number[],
  locationSocket: any,
  user: number,
  roomId: string,
) => {
  dispatch(resetStates());
  dispatch(setIsLoggingOn());
  storeData('@DogsSocket', dogs);
  const hasLog = await containsKey('@WalkingLogsSocket');
  if (!hasLog) {
    const startDate = new Date().toString();
    storeData('@StartDateSocket', startDate);
    storeData('@intendedSocket', false);
    dispatch(setStartDate(startDate));
    storeData('@WalkingLogsSocket', []);
  }
  const watchId = Geolocation.watchPosition(
    position => {
      console.log('position은 새로받나');
      const gpsLocalData = {
        ownerIdx: user,
        roomId,
        gps: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      };
      locationSocket.emit('gps', gpsLocalData);
      console.log('emit 도 보내긴함');
      const UpdateDate = new Date().toString();
      dispatch(setMyPosition(gpsLocalData.gps));
      dispatch(addPath(gpsLocalData.gps));
      storeData('@LastUpdateSocket', UpdateDate);
      dispatch(setLastUpdate(UpdateDate));
      addPathToAsync(gpsLocalData.gps);
    },
    error => {
      Alert.alert('알림', '죄송합니다. 위치정보 기록이 중단되었습니다.');
      console.error(error);
    },
    {
      interval: 5000,
      maximumAge: 200000,
      enableHighAccuracy: true,
      timeout: 20000,
      distanceFilter: 5,
    },
  );
  if (typeof watchId === 'number') {
    dispatch(setWatchId(watchId));
  }
};
//asyncStorage에 path추가
const addPathToAsync = async (position: Coord) => {
  let path = await getData('@WalkingLogsSocket');
  path.push(position);
  await storeData('@WalkingLogsSocket', path);
};

// 비정상 기록 저장 여부 질문
export const lastLogAlert = async (
  navigation: any,
  dispatch: any,
  removeList: string[],
  dogs: number[],
) => {
  const isOver = await checkLastUpdate();
  if (!isOver) {
    Alert.alert(
      '비정상 종료된 산책이 있습니다',
      '이어서 산책하시겠습니까?',
      [
        {
          text: '네',
          onPress: async () => {
            await syncLogs(dispatch);
            navigation.navigate('MapViewworker');
          },
        },
        {
          text: '아니요',
          onPress: async () => {
            await removeMultiple(removeList);
            await dispatch(resetStates);
            navigation.navigate('MapViewAlone');
            startLogging(dispatch, dogs);
          },
        },
      ],
      {cancelable: false},
    );
  } else {
    await removeMultiple(removeList);
    storeData('@intendedSocket', true);
    Alert.alert(
      '알림',
      '종료 버튼을 누르지 않아 산책이 자동적으로 종료되었습니다.',
    );
  }
};

// Local에 key들이 전부 존재하는지 확인
export const checkLocal = async (checkList: string[]) => {
  const allKeys = await getAllKeys();
  if (checkList.every(i => allKeys.includes(i))) {
    return true;
  } else {
    return false;
  }
};

export const isIntended = async () => {
  const isIntendedLocal = await AsyncStorage.getItem('@intendedSocket');
  if (isIntendedLocal === 'false') {
    return false;
  }
  return true;
};

// local 마지막 기록 시간확인
export const checkLastUpdate = async () => {
  const loggedDate = new Date(await getData('@LastUpdateSocket'));
  loggedDate.setHours(loggedDate.getMinutes() + 30);
  const currentDate = new Date();
  // 마지막 기록시간보다 30분 이상 지나 있을 때
  if (loggedDate >= currentDate) {
    return false;
  } // 30분 이내의 기내의 기록이 있을 때
  else {
    return true;
  }
};

//로그 로컬 <-> 리덕스 동기화
const syncLogs = async (dispatch: any) => {
  const values = await getMultiple(localList);
  if (values !== undefined) {
    const logsPair = {
      startDate: values[0],
      lastUpdate: values[1],
      walkingLogs: values[2],
      myPosition: values[2][values[2].length - 1],
    };
    // dispatch(setSelectedMyDogs(values[3]));
    dispatch(setStates(logsPair));
  }
};

// local/redux 초기화
export const clearLogsAll = async (dispatch: any) => {
  await removeMultiple(localList);

  await dispatch(resetStates());
};

export const quitLogging = (watchID: number) => {
  Geolocation.clearWatch(watchID);
};

// 산책 종료시 : logview이동, 저장API, local/redux 초기화
export const doneWalking = async (
  dispatch: any,
  navigation: any,
  watchId: number,
) => {
  quitLogging(watchId);
  dispatch(setIsLoggingOff());
  // storeData('@intendedSocket', true);
  navigation.replace('LogView');
};
