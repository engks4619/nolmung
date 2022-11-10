import React from 'react';
import {View} from 'react-native';
import MapViewTemplate from '@templates/MapViewTemplate';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';

function MapViewAlone() {
  const myPosition = useSelector(
    (state: RootState) => state.myPosition.myPosition,
  );
  const path = useSelector((state: RootState) => state.myPosition.path);
  return (
    <View>
      <MapViewTemplate myPosition={myPosition} path={path} />
    </View>
  );
}
export default MapViewAlone;
