import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import axios from 'utils/axios';
import {useLocationSocket} from '~/hooks/useSocket';
import MapViewWatcherTemplate from '~/templates/MapViewWatcherTemplate';

function MapViewWatcher({navigation, route}: any) {
  const dispatch = useDispatch();
  const postIdx = route.params.postIdx;
  const roomId = route.params.roomId;
  const userIdx = useSelector((state: RootState) => state.user.userIdx);

  const path = useSelector((state: RootState) => state.watcher.path);
  const myPosition = path[path.length - 1];
  const [locationSocket, locationDisconnect] = useLocationSocket();

  const dogIdxs = useSelector((state: RootState) => state.watcher.dogs);
  const distance = useSelector((state: RootState) => state.watcher.distance);
  const startDate = useSelector(
    (state: RootState) => state.socketPosition.startDate,
  );
  const lastUpdate = useSelector(
    (state: RootState) => state.socketPosition.lastUpdate,
  );
  const [dogsList, setDogsList] = useState([]);
  // 개 불러오기
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
    <MapViewWatcherTemplate
      myPosition={myPosition}
      path={path.slice(5)}
      dogInfoList={dogsList}
      startDate={startDate}
      doneWalking={() => {
        navigation.replace('WalkReview');
      }}
      distance={distance}
      dispatch={dispatch}
      second={second}
      navigation={navigation}
    />
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
