import React, {useEffect, useState, useRef} from 'react';
import {Alert, View} from 'react-native';
import MapViewTemplate from '@templates/MapViewTemplate';
import OnSaving from '@pages/OnSaving';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
// import {doneWalking, clearLogsAll} from '~/utils/SocketPositionFunctions';
import {addDistance} from '~/slices/watcherSlice';
import axios from 'utils/axios';
import {removeMultiple} from '~/utils/AsyncService';
import {setDogs} from '~/slices/watcherSlice';

function MapViewWatcher({navigation, route}: any) {
  const dispatch = useDispatch();
  const postIdx = route.params.postIdx;
  const intervalId = route.params.intervalId;
  const userIdx = useSelector((state: RootState) => state.user.userIdx);

  const path = useSelector((state: RootState) => state.watcher.path);
  const myPosition = path[path.length - 1];
  // const isSaving = useSelector(
  //   (state: RootState) => state.socketPosition.isSaving,
  // );
  // const watchId = useSelector(
  //   (state: RootState) => state.socketPosition.watchId,
  // );

  const dogs = useSelector((state: RootState) => state.watcher.dogs);
  const distance = useSelector(
    (state: RootState) => state.socketPosition.distance,
  );
  const selectedDogs = useSelector(
    (state: RootState) => state.dogs.selectedDogsInfo,
  );

  const startDate = useSelector(
    (state: RootState) => state.socketPosition.startDate,
  );
  const lastUpdate = useSelector(
    (state: RootState) => state.socketPosition.lastUpdate,
  );

  // 개 불러오기
  const getDogs = async () => {
    const response = await axios.get(`community/post/dog-info/${postIdx}`);
    console.log(response.data);
    dispatch(setDogs({dogs: response.data}));
  };
  useEffect(() => {
    getDogs();
  }, []);

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

  return (
    <View>
      <MapViewTemplate
        myPosition={myPosition}
        path={path}
        dogInfoList={dogs}
        startDate={startDate}
        doneWalking={() => {
          console.log(intervalId, '클리어');
          clearInterval(intervalId);
          navigation.replace('WalkReview');
          // handleDoneWalking();
        }}
        distance={distance}
        dispatch={dispatch}
        second={second}
        navigation={navigation}
      />
    </View>
  );
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

export default MapViewWatcher;
