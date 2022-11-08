import React, {Dispatch, SetStateAction} from 'react';
import {SafeAreaView, View} from 'react-native';
import LocationSummary from '@organisms/LocationSummary';
import SpotsContainer from '@organisms/SpotsContainer';
import {Spot} from '~/pages/Spots';
import SpotsFilter from '~/organisms/SpotsFilter';

interface Props {
  spotList: Spot[];
  totalPage: number;
  userLocation: string;
  onSearchSubmit: (val: string) => void;
  searchValue: string;
  onChangeSearchValue: (val: string) => void;
  loadMore: () => void;
  sort: number;
  setSort: Dispatch<SetStateAction<number>>;
  limitDistance: number;
  setLimitDistance: Dispatch<SetStateAction<number>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  initSpotRequest: () => void;
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
  initSpotRequest,
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
      <SpotsContainer spotList={spotList} loadMore={loadMore} />
    </SafeAreaView>
  );
}

export default SpotsTemplate;
