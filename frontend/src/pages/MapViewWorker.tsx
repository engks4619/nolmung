import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Alert} from 'react-native';
import MapViewTemplate from '@templates/MapViewTemplate';
import OnSaving from '@pages/OnSaving';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {doneWalking} from '~/utils/SocketPositionFunctions';
import {addDistance} from '~/slices/socketPositionSlice';
import axios from 'utils/axios';
import {useLocationSocket} from '~/hooks/useSocket';
import {useAppDispatch} from '~/store';

function MapViewWorker({navigation, route}: any) {
  const dispatch = useAppDispatch();
  const walkRoomId = route.params.roomId;
  const postIdx = route.params.postIdx;
  const [locationSocket, locationDisconnect] = useLocationSocket();

  const userIdx = useSelector((state: RootState) => state.user.userIdx);
  const myPosition = useSelector(
    (state: RootState) => state.socketPosition.myPosition,
  );

  const path = useSelector((state: RootState) => state.socketPosition.path);
  const dogIdxs = useSelector((state: RootState) => state.socketPosition.dogs);

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

  // 개 불러오기
  const [dogsList, setDogsList] = useState([]);
  const getDogs = async () => {
    try {
      const response = await axios.get(`community/post/dog-info/${postIdx}`);
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

  const handleDoneWalking = useCallback(async () => {
    console.log('종료', walkRoomId);
    if (locationSocket) {
      locationSocket.emit('endWalk', walkRoomId);
      doneWalking(dispatch, navigation, watchId);
      await submitLogs();
    }
  }, [walkRoomId]);

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
