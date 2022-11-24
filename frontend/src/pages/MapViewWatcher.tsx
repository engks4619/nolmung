import React, {useEffect, useState, useRef} from 'react';
import {Alert, View} from 'react-native';
import MapViewTemplate from '@templates/MapViewTemplate';
import OnSaving from '@pages/OnSaving';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {addDistance} from '~/slices/watcherSlice';
import axios from 'utils/axios';
import {setPath, setDogs} from '~/slices/watcherSlice';
import {useLocationSocket} from '~/hooks/useSocket';

function MapViewWatcher({navigation, route}: any) {
  const dispatch = useDispatch();
  const postIdx = route.params.postIdx;
  const roomId = route.params.roomId;
  const userIdx = useSelector((state: RootState) => state.user.userIdx);

  const path = useSelector((state: RootState) => state.watcher.path);
  const myPosition = path[path.length - 1];
  const [locationSocket, locationDisconnect] = useLocationSocket();
  // const isSaving = useSelector(
  //   (state: RootState) => state.socketPosition.isSaving,
  // );
  // const watchId = useSelector(
  //   (state: RootState) => state.socketPosition.watchId,
  // );

  const dogIdxs = useSelector((state: RootState) => state.watcher.dogs);
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
    locationSocket?.on('replyEndWalk', replyEndWalk => {
      if (typeof replyEndWalk === 'string') {
        // navigation.replace('LogViewWatcher');
      }
    });
  }, []);
  // useEffect(() => {
  //   locationSocket?.on('gpsInfo', gpsInfo => {
  //     console.log(gpsInfo);
  //     if (gpsInfo === 400) {
  //       // 산책 기록 없음
  //       // Alert.alert(
  //       //   '알림',
  //       //   '아직 산책을 시작하지 않았습니다. \n산책이 시작되면 알려드릴게요 :)',
  //       // );
  //     } else if (gpsInfo === 403) {
  //       // 산책중아님
  //     } else if (gpsInfo) {
  //       // 강아지 위치 정보 gpsInfo 담겨서 옴
  //       dispatch(setPath({path: gpsInfo.gps}));
  //       dispatch(addDistance(0));
  //       // dispatch(addDistance(gpsInfo.distacne));
  //     }
  //   });
  // }, [locationSocket, roomId]);

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
    <MapViewTemplate
      myPosition={myPosition}
      path={path}
      dogInfoList={dogsList}
      startDate={startDate}
      doneWalking={() => {
        navigation.replace('WalkReview');
        // handleDoneWalking();
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
