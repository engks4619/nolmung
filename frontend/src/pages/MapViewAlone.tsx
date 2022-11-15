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
  const dogs = useSelector((state: RootState) => state.myPosition.dogs);
  const watchId = useSelector((state: RootState) => state.myPosition.watchId);
  const count = useSelector((state: RootState) => state.myPosition.count);
  // const mapViewFunc = (dispatch, navigation, watchId) => {doneWalking()}
  if (isSaving) {
    return <OnSaving />;
  } else {
    return (
      <View>
        <MapViewTemplate
          myPosition={myPosition}
          path={path}
          dogInfoList={dogs}
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
