import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import LogViewTemplate from '@templates/LogviewTemplate';
import {logsToServer} from '~/utils/MyPositionFunctions';
import {dogInfo} from '~/molecules/MainDogs';

const functions = [logsToServer]; //저장x,저장하기,이어하기,navigate뒤로가기 추가해야함

function LogView({route}: any) {
  const path = useSelector((state: RootState) => state.myPosition.path);
  const isOver = route.params.isOver;
  const dogsInfo: dogInfo[] = useSelector(
    (state: RootState) => state.dogs.dogsInfo,
  );
  const selectedDogs: number[] = useSelector(
    (state: RootState) => state.dogs.selectedDogsInfo,
  );
  const myPosition = useSelector(
    (state: RootState) => state.myPosition.myPosition,
  );
  // dogs type import해와서 지정
  const dogs: dogInfo[] = [];
  dogsInfo.forEach(elem => {
    if (selectedDogs.includes(elem.dogIdx)) {
      dogs.push(elem);
    }
  });

  return (
    <View>
      <LogViewTemplate
        functions={functions}
        path={path}
        dogInfoList={dogs}
        isOver={isOver}
        myPosition={myPosition}
      />
    </View>
  );
}
export default LogView;
