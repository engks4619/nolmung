import React from 'react';
import {View} from 'react-native';
import LocationSummary from '~/organisms/LocationSummary';

interface Props {
  spotList: any[];
  totalPage : number;
  userLocation: string;
  onSearchSubmit: Function;
  searchValue: string;
  onChangeSearchValue: Function;
}

function SpotsTemplate({
  spotList, 
  totalPage, 
  userLocation, 
  onSearchSubmit,
  searchValue,
  onChangeSearchValue,
}: Props) {
  return (
    <View>
      <LocationSummary
        userLocation={userLocation}
        onSearchSubmit={onSearchSubmit}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
      />
    </View>
  );
}

export default SpotsTemplate;
