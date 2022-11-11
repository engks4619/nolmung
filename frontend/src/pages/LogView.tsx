import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import LogViewTemplate from '@templates/LogviewTemplate';
import {logsToServer} from '~/utils/FuctionsForMypostionSlice';

const functions = [logsToServer]; //저장x,저장하기,이어하기,navigate뒤로가기 추가해야함

function LogView({route}: any) {
  const myPositionStates = useSelector((state: RootState) => state.myPosition);
  const isOver = route.params.isOver;
  console.log('mpPath', myPositionStates.path);
  return (
    <View>
      <LogViewTemplate
        functions={functions}
        path={myPositionStates.path}
        dogInfoList={myPositionStates.dogs}
        isOver={isOver}
        // myPosition={myPositionStates.path[0]}
        myPosition={{latitude: 33.8805, longitude: -118.2084}}
      />
    </View>
  );
}
export default LogView;
