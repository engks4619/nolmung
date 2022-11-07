import React from 'react';
import { SafeAreaView, View } from 'react-native';
import LocationSummary from '@organisms/LocationSummary';
import SpotsContainer from '@organisms/SpotsContainer';
import { Spot } from '~/pages/Spots';
import SpotsFilter from '~/organisms/SpotsFilter';

interface Props {
  spotList: Spot[];
  totalPage : number;
  userLocation: string;
  onSearchSubmit: Function;
  searchValue: string;
  onChangeSearchValue: Function;
  loadMore: Function;
  sort: number;
  setSort: Function;
  limitDistance: number;
  setLimitDistance: Function;
  category: string;
  setCategory: Function;
  initSpotRequest: Function;
}

function SpotsTemplate({
  spotList, 
  totalPage, 
  userLocation, 
  onSearchSubmit,
  searchValue,
  onChangeSearchValue,
  loadMore,
  sort,
  setSort,
  limitDistance,
  setLimitDistance,
  category,
  setCategory,
  initSpotRequest
}: Props) {
  return (
    <SafeAreaView>
      <LocationSummary
        userLocation={userLocation}
        onSearchSubmit={onSearchSubmit}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        />
      <SpotsFilter
        sort={sort}
        setSort={setSort}
        limitDistance={limitDistance}
        setLimitDistance={setLimitDistance}
        category={category}
        setCategory={setCategory}
        initSpotRequest={initSpotRequest}
      />

      <SpotsContainer
        spotList={spotList}
        loadMore={loadMore}
        />
    </SafeAreaView>
  );
}

export default SpotsTemplate;
