import {Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
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
  setWatchId,
  setStartDate,
  setLastUpdate,
} from '~/slices/socketPositionSlice';
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
  oppentIdx: number,
  roomId: string,
  postIdx: any,
) => {
  if (socketPositionState.isLogging) {
    //watchPostion이 실행 중 => 아무 동작 없이 mapView만 띄울 것
    navigation.navigate('MapViewWorker', {postIdx: postIdx});
  } else if (!socketPositionState.isLogging) {
    // watchPosition이 중단 된 상태 => local 확인 해보고 판단
    locationSocket.emit('startWalk', {roomId: roomId, ownerIdx: oppentIdx});
    startLogging(dispatch, dogs, locationSocket, oppentIdx, roomId);
    navigation.navigate('MapViewWorker', {postIdx: postIdx, roomId: roomId});
  }
};
const haversine = require('haversine');
export const startLogging = async (
  dispatch: any,
  dogs: number[],
  locationSocket: any,
  oppentIdx: number,
  roomId: string,
) => {
  dispatch(resetStates());
  dispatch(setIsLoggingOn());
  const startDate = new Date().toString();
  dispatch(setStartDate(startDate));
  var tmpLoc = null;
  var distance = 0;
  const watchId = Geolocation.watchPosition(
    position => {
      if (tmpLoc !== null) {
        const currentPosi = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        distance = haversine(currentPosi, tmpLoc, {
          unit: 'meter',
        });
      } else if (tmpLoc === null) {
        tmpLoc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      }
      const gpsLocalData = {
        ownerIdx: oppentIdx,
        roomId,
        gps: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        distance: distance,
      };
      locationSocket.emit('gps', gpsLocalData);
      console.log(gpsLocalData.distance);
      const UpdateDate = new Date().toString();
      dispatch(setMyPosition(gpsLocalData.gps));
      dispatch(addPath(gpsLocalData.gps));
      dispatch(setLastUpdate(UpdateDate));
    },
    error => {
      Alert.alert('알림', '죄송합니다. 위치정보 기록이 중단되었습니다.');
      console.error(error);
    },
    {
      interval: 2000,
      maximumAge: 200000,
      enableHighAccuracy: true,
      timeout: 20000,
      distanceFilter: 0,
    },
  );
  if (typeof watchId === 'number') {
    dispatch(setWatchId(watchId));
  }
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
  navigation.replace('LogViewWorker');
};
