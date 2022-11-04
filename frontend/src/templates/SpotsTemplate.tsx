import React from 'react';
import { View } from 'react-native';
import LocationSummary from '@organisms/LocationSummary';
import SpotsContainer from '@organisms/SpotsContainer';
import { Spot } from '~/pages/Spots';

interface Props {
  spotList: Spot[];
  totalPage : number;
  userLocation: string;
  onSearchSubmit: Function;
  searchValue: string;
  onChangeSearchValue: Function;
  loadMore: Function;
}

function SpotsTemplate({
  spotList, 
  totalPage, 
  userLocation, 
  onSearchSubmit,
  searchValue,
  onChangeSearchValue,
  loadMore,
}: Props) {
  return (
    <View>
      <LocationSummary
        userLocation={userLocation}
        onSearchSubmit={onSearchSubmit}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        />
      <SpotsContainer
        spotList={spotList}
        loadMore={loadMore}
        />
    </View>
  );
}

export default SpotsTemplate;
