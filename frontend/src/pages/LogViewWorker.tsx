import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '~/store';
import {RootState} from '~/store/reducer';
import LogViewTemplate from '@templates/LogviewTemplate';
import {clearLogsAll} from '~/utils/MyPositionFunctions';

function LogViewWorker({navigation}: any) {
  const dispatch = useAppDispatch();

  const path = useSelector((state: RootState) => state.socketPosition.path);
  const dogs = useSelector((state: RootState) => state.socketPosition.dogs);
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

  // // img,데이터 전송
  // const submitLogs = async () => {
  //   const jsonData = {
  //     ownerIdx: userIdx,
  //     walkerIdx: userIdx,
  //     distance: distance,
  //     time:
  //       lastUpdate && startDate
  //         ? (new Date(lastUpdate).getTime() - new Date(startDate).getTime()) /
  //           1000
  //         : 0,
  //     startDate: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
  //     endDate: moment(lastUpdate).format('YYYY-MM-DD HH:mm:ss'),
  //     walkedDogList: selectedDogs,
  //     gpsList: path,
  //   };

  //   try {
  //     const response = await axios.post('withdog/walk', jsonData);
  //     if (response.status === 200) {
  //       Alert.alert(
  //         '저장완료',
  //         '기록이 저장 되었습니다',
  //         [
  //           {
  //             text: '확인',
  //             onPress: () => {
  //               goBackAndClear();
  //             },
  //           },
  //         ],
  //         {
  //           cancelable: true,
  //           onDismiss: () => {
  //             goBackAndClear();
  //           },
  //         },
  //       );
  //     }
  //   } catch (err: any) {
  //     Alert.alert('저장에 실패 했습니다', '다시 시도해 주세요');
  //   }
  // };

  //저장o

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
export default LogViewWorker;
