import {Alert} from 'react-native';
import {removeMultiple} from '~/utils/AsyncService';
import {startLogging, checkLastUpdate} from '~/slices/myPositionSlice';
// 지난 기록 보실래요?sssssss
export const lastLogAlert = (
  navigation: any,
  dispatch: any,
  removeList: string[],
) => {
  Alert.alert(
    '비정상 종료된 산책이 있습니다',
    '지난 기록을 보시겠어요?',
    [
      {
        text: '무시하고 새로 시작',
        onPress: () => {
          removeMultiple(removeList);
          navigation.navigate('MapViewAlone');
          startLogging(dispatch);
        }, //local 지우기, navigate mapView
      },
      {
        text: '네 볼래요',
        onPress: async () => {
          const isOver = !(await checkLastUpdate());
          if (isOver) {
            navigation.navigate('LogView', {isOver});
          } else {
            navigation.navigate('LogView', {isOver});
          }
        }, // chekc 30U/O, logView page로
      },
    ],
    {cancelable: false},
  );
  return;
};
