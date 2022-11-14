import React from 'react';
import {View} from 'react-native';
import MapViewTemplate from '@templates/MapViewTemplate';
import OnSaving from '@pages/OnSaving';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';

function MapViewAlone() {
  const myPosition = useSelector(
    (state: RootState) => state.myPosition.myPosition,
  );
  const path = useSelector((state: RootState) => state.myPosition.path);
  const isSaving = useSelector((state: RootState) => state.myPosition.isSaving);
  const dogs = useSelector((state: RootState) => state.myPosition.dogs);
  if (isSaving) {
    return <OnSaving />;
  } else {
    return (
      <View>
        <MapViewTemplate
          myPosition={myPosition}
          path={path}
          dogInfoList={dogs}
        />
      </View>
    );
  }
}
export default MapViewAlone;
