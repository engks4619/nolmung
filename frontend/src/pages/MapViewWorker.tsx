import React, {useEffect, useState, useRef} from 'react';
import {Alert, View} from 'react-native';
import MapViewTemplate from '@templates/MapViewTemplate';
import OnSaving from '@pages/OnSaving';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {doneWalking, clearLogsAll} from '~/utils/SocketPositionFunctions';
import {addDistance} from '~/slices/socketPositionSlice';
import {setDogs} from '~/slices/socketPositionSlice';
import axios from 'utils/axios';
import {removeMultiple} from '~/utils/AsyncService';
import {useLocationSocket} from '~/hooks/useSocket';

const moment = require('moment');
const localList = [
  '@StartDateSocket',
  '@LastUpdateSocket',
  '@WalkingLogsSocket',
  '@DogsSocket',
];

function MapViewWorker({navigation, route}: any) {
  const dispatch = useDispatch();
  const postIdx = route.params.postIdx;
  const [locationSocket, locationDisconnect] = useLocationSocket();
  const userIdx = useSelector((state: RootState) => state.user.userIdx);
  const myPosition = useSelector(
    (state: RootState) => state.socketPosition.myPosition,
  );

  const path = useSelector((state: RootState) => state.socketPosition.path);
  const dogIdxs = useSelector((state: RootState) => state.socketPosition.dogs);
  const roomId = useSelector(
    (state: RootState) => state.socketPosition.walkRoomId,
  );
  const isSaving = useSelector(
    (state: RootState) => state.socketPosition.isSaving,
  );
  const watchId = useSelector(
    (state: RootState) => state.socketPosition.watchId,
  );

  const distance = useSelector(
    (state: RootState) => state.socketPosition.distance,
  );
  const startDate = useSelector(
    (state: RootState) => state.socketPosition.startDate,
  );
  const lastUpdate = useSelector(
    (state: RootState) => state.socketPosition.lastUpdate,
  );
  // const second = useSelector((state: RootState) => {
  //   state.socketPosition.second;
  // });

  // 개 불러오기
  const [dogsList, setDogsList] = useState([]);
  const getDogs = async () => {
    try {
      const response = await axios.get(`community/post/dog-info/${postIdx}`);
      console.log(response.data);
      setDogsList(response.data);
    } catch (err) {
      console.log('postIdx로 개정보 불러오기 실패');
    }
  };
  useEffect(() => {
    getDogs();
  }, []);

  const submitLogs = async () => {
    const jsonData = {
      ownerIdx: userIdx,
      walkerIdx: userIdx,
      distance: distance,
      time: second,
      startDate: startDate,
      endDate: lastUpdate,
      walkedDogList: dogIdxs,
      gpsList: path,
    };

    try {
      const response = await axios.post('withdog/walk', jsonData);
      if (response.status === 200) {
        // 저장 성공
        navigation.replace('LogViewWorker');
      }
    } catch (err: any) {
      Alert.alert('저장에 실패 했습니다', '다시 시도해 주세요');
    }
  };

  const handleDoneWalking = async () => {
    locationSocket?.emit('endWalk', roomId);
    doneWalking(dispatch, navigation, watchId);
    // dispatch(setIsSavingOn);
    await submitLogs();
    // dispatch(setIsSavingOff);
  };

  //시간계산
  const defaultSec =
    typeof startDate === 'string'
      ? (new Date().getTime() - new Date(startDate).getTime()) / 1000
      : 0;
  const [second, setSecond] = useState(defaultSec);
  const [delay, setDelay] = useState(1000);

  useInterval(() => {
    setSecond(second + 1);
  }, delay);

  //거리계산
  useEffect(() => {
    const haversine = require('haversine');
    if (path.length >= 2) {
      const d = haversine(path[path.length - 1], path[path.length - 2], {
        unit: 'meter',
      });
      dispatch(addDistance(d));
    }
  }, [path]);

  if (isSaving) {
    return <OnSaving />;
  } else {
    return (
      <View>
        <MapViewTemplate
          myPosition={path[path.length - 1]}
          path={path}
          dogInfoList={dogsList}
          startDate={startDate}
          doneWalking={() => {
            handleDoneWalking();
          }}
          distance={distance}
          dispatch={dispatch}
          second={second}
          navigation={navigation}
        />
      </View>
    );
  }
}

const useInterval = (callback, delay): HookType => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default MapViewWorker;
