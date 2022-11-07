import { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {Alert, ScrollView, StatusBar, Text, View} from 'react-native';
import SpotsTemplate from '~/templates/SpotsTemplate';
import spotAxios from '~/utils/spotAxios';

export interface menu {
  menuName: string,
  menuPrice: number,
}

export interface time {
  timeName: string,
  timeDesc: string,
}
export interface Spot {
  category: string | null,
  distance: number,
  imgCnt: number,
  address: string | null,
  lat: number,
  lng: number,
  descList: string[] | null,
  menuList: menu[] | null,
  timeList: time[] | null,
  name: string,
  reviewCnt: number,
  star: number | null,
  tag: string | null,
  spotId: string,
  tel: string | null,
}

function Spots() {
  interface SpotRequest {
    lat: number,
    lng: number,
    searchValue: string,
    limitDistance: number,
    category: string,
  }

  const [spotList, setSpotList] = useState<Spot[]>([]);
  const [page, setPage] = useState<number>(0);
  const [sort, setSort] = useState<number>(0);
  const [limitDistance, setLimitDistance] = useState<number>(1000);
  const [category, setCategory] = useState<string>('카페');
  const [spotRequest, setSpotRequest] = useState<SpotRequest | null>();
  const [totalPage, setTotalPage] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<string>('알수없음');
  const [searchValue, setSearchValue] = useState<string>('');

  
  const getSpotList = async () => {
    const params = {
      page: 0,
      sort: sort,
    }
    try {
      const response: AxiosResponse = await spotAxios.post(`/spot`, spotRequest, {params});
      console.log(response.status);
      if(response.status == 200) {
        const data = await response.data;
        // setSpotList(data?.spotDtoList);
        setSpotList([...data?.spotDtoList]);
        setTotalPage(data?.totalPage);
      }
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error}`
      )
    }
  };

  const getMoreSpotList = async () => {
    const params = {
      page,
      sort,
    }
    try {
      const response: AxiosResponse = await spotAxios.post(`/spot`, spotRequest, {params});
      console.log(response.status);
      if(response.status == 200) {
        const data = await response.data;
        setSpotList([...spotList, ...data?.spotDtoList]);
        setTotalPage(data?.totalPage);
      }
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error}`
      )
    }
  }

  const onChangeSearchValue = useCallback((val : string) => {
    setSearchValue(val.trim());
  },[]);

  const onSearchSubmit = () => {
    setSpotRequest({
      ...spotRequest, 
      searchValue
    } as SpotRequest);
  };

  const loadMore = () => {
    if(page < totalPage) {
      setPage(page + 1);
    }
  }
  

  const initSpotRequest = () => {
    const requestBody: SpotRequest = {
      "lat" : 0,
      "lng" : 0,
      "searchValue" : '',
      "limitDistance" : 1000,
      "category" : '카페',
    };

    setSpotRequest(requestBody);
  }

  const getUserLocation = () => {
    setUserLocation('동작/사당');
  }

  useEffect(() => {
    initSpotRequest();
    getUserLocation();
  },[])

  useEffect(() => {
    if(!spotRequest)
      return;
    getSpotList();
  }, [spotRequest, sort]);

  useEffect(()=> {
    setSpotRequest({
      ...spotRequest, 
      limitDistance,
      category
    } as SpotRequest);
  },[limitDistance, category]);

  useEffect(() => {
    if (!page)
      return;
    getMoreSpotList();
  }, [page])
  
  return (
    <View>
      <SpotsTemplate 
        spotList={spotList} 
        totalPage={totalPage}
        userLocation={userLocation}
        onSearchSubmit={onSearchSubmit}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        loadMore={loadMore}
        sort={sort}
        setSort={setSort}
        limitDistance={limitDistance}
        setLimitDistance={setLimitDistance}
        category={category}
        setCategory={setCategory}
        initSpotRequest={initSpotRequest}
        />
    </View>
  );
}

export default Spots;