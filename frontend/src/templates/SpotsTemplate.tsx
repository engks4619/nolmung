import React, {Dispatch, SetStateAction} from 'react';
import {SafeAreaView} from 'react-native';
import LocationSummary from '@organisms/LocationSummary';
import SpotsContainer from '@organisms/SpotsContainer';
import {Spot, SpotRequest} from '~/pages/Spots';
import SpotsFilter from '~/organisms/SpotsFilter';

interface Props {
  spotList: Spot[];
  page: number;
  totalPage: number;
  userLocation: string;
  spotRequest: SpotRequest | null;
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
  page,
  totalPage,
  userLocation,
  spotRequest,
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
    <SafeAreaView style={{backgroundColor: 'white'}}>
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
        spotRequest={spotRequest}
        page={page}
        sort={sort}
        limitDistance={limitDistance}
        category={category}
      />
    </SafeAreaView>
  );
}

export default SpotsTemplate;
