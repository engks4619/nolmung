import React from 'react';
import {View} from 'react-native';
import MapViewTemplate from '@templates/MapViewTemplate';
import OnSaving from '@pages/OnSaving';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {doneWalking} from '~/utils/MyPositionFunctions';

function MapViewAlone({navigation}: any) {
  const dispatch = useDispatch();
  const myPosition = useSelector(
    (state: RootState) => state.myPosition.myPosition,
  );
  const path = useSelector((state: RootState) => state.myPosition.path);
  const isSaving = useSelector((state: RootState) => state.myPosition.isSaving);
  const watchId = useSelector((state: RootState) => state.myPosition.watchId);
  const dogsInfo = useSelector((state: RootState) => state.dogs.dogsInfo);
  const selectedDogs = useSelector(
    (state: RootState) => state.dogs.selectedDogsInfo,
  );
  const startDate = useSelector(
    (state: RootState) => state.myPosition.startDate,
  );
  // LogView 함수 만들어서 import하기
  const dogs: any[] = [];
  dogsInfo.forEach(elem => {
    if (selectedDogs.includes(elem.dogIdx)) {
      dogs.push(elem);
    }
  });

  if (isSaving) {
    return <OnSaving />;
  } else {
    return (
      <View>
        <MapViewTemplate
          myPosition={myPosition}
          path={path}
          dogInfoList={dogs}
          startDate={startDate}
          doneWalking={() => {
            doneWalking(dispatch, navigation, watchId);
          }}
        />
      </View>
    );
  }
}
export default MapViewAlone;
