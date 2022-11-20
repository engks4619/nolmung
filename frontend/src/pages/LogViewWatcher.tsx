import React from 'react';
import {View, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '~/store';
import {RootState} from '~/store/reducer';
import LogViewTemplate from '@templates/LogviewTemplate';
import {dogInfo} from '~/molecules/MainDogs';
import axios from 'utils/axios';
import {setIsSavingOff, setIsSavingOn} from '~/slices/myPositionSlice';
import {clearLogsAll, startLogging} from '~/utils/MyPositionFunctions';

function LogViewWatcher({navigation}: any) {
  const dispatch = useAppDispatch();

  const path = useSelector((state: RootState) => state.watcher.path);
  const dogs = useSelector((state: RootState) => state.watcher.dogs);
  const myPosition = useSelector(
    (state: RootState) => state.socketPosition.myPosition,
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
  // const userIdx = useSelector((state: RootState) => state.user.userIdx);

  const goBackAndClear = () => {
    navigation.replace('MainPage');
    clearLogsAll(dispatch);
  };
  const utcTOKST = (curr: string | null) => {
    if (curr) {
      const currT = new Date(curr);
      const utc = currT.getTime() + currT.getTimezoneOffset() * 60 * 1000;
      const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
      const kr_curr = new Date(utc + KR_TIME_DIFF).toString();
      return kr_curr;
    } else {
      return null;
    }
  };

  return (
    <View>
      <LogViewTemplate
        path={path}
        dogInfoList={dogs}
        myPosition={myPosition}
        saveLogs={() => {}}
        noSaveLogs={() => {}}
        countinueLogs={() => {}}
        distance={distance}
        second={
          lastUpdate && startDate
            ? (new Date(lastUpdate).getTime() - new Date(startDate).getTime()) /
              1000
            : 0
        }
        startDate={utcTOKST(startDate)}
      />
    </View>
  );
}
export default LogViewWatcher;
