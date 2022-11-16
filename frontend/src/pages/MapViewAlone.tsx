import React from 'react';
import {View} from 'react-native';
import MapViewTemplate from '@templates/MapViewTemplate';
import OnSaving from '@pages/OnSaving';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {doneWalking} from '~/utils/MyPositionFunctions';
import {increaseTimeCount} from '~/slices/myPositionSlice';

function MapViewAlone({navigation}: any) {
  const dispatch = useDispatch();
  const myPosition = useSelector(
    (state: RootState) => state.myPosition.myPosition,
  );
  const path = useSelector((state: RootState) => state.myPosition.path);
  const isSaving = useSelector((state: RootState) => state.myPosition.isSaving);
  const selectedDogs = useSelector(
    (state: RootState) => state.dogs.selectedDogsInfo,
  );
  const dogsInfo = useSelector((state: RootState) => state.dogs.dogsInfo);
  const watchId = useSelector((state: RootState) => state.myPosition.watchId);
  const count = useSelector((state: RootState) => state.myPosition.timeCount);

  const selectedDogsInfo: any[] = [];
  dogsInfo.forEach(elem => {
    if (selectedDogs.includes(elem.dogIdx)) {
      selectedDogsInfo.push(elem);
    }
  });
  console.log(selectedDogsInfo);
  if (isSaving) {
    return <OnSaving />;
  } else {
    return (
      <View>
        <MapViewTemplate
          myPosition={myPosition}
          path={path}
          dogInfoList={selectedDogsInfo}
          doneWalking={() => {
            doneWalking(dispatch, navigation, watchId);
          }}
          count={count}
          increaseCount={() => {
            dispatch(increaseTimeCount);
          }}
        />
      </View>
    );
  }
}
export default MapViewAlone;
