import { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {Alert, ScrollView, StatusBar, Text, View} from 'react-native';
import SpotsTemplate from '~/templates/SpotsTemplate';
import spotAxios from '~/utils/spotAxios';

function Spots() {
  interface SpotRequest {
    lat: number,
    lng: number,
    searchValue: string,
    limitDistance: number,
    category: string,
  }

  interface menu {
    menuName: string,
    menuPrice: number,
  }

  interface time {
    timeName: string,
    timeDesc: string,
  }
  interface Spot {
    address: string | null,
    descList: string[] | null,
    distance: number,
    lat: number,
    lng: number,
    menuList: menu[] | null,
    timeList: time[] | null,
    name: string,
    star: number | null,
    tag: string | null,
    spotId: string,
    tel: string | null,
  }

  const [spotList, setSpotList] = useState<Spot[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<number>(0);
  const [spotRequest, setSpotRequest] = useState<SpotRequest | null>();
  const [totalPage, setTotalPage] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<string>('알수없음');
  const [searchValue, setSearchValue] = useState<string>('');

  const getSpotList = async () => {
    try {
      const {data}: AxiosResponse = await spotAxios.post(`/spot?page=${page}&sort=${sort}`, spotRequest);
      if(data?.status === 'OK' && data?.message === 'success') {
        setSpotList(data?.responseDto?.spotDtoList);
        setTotalPage(data?.responseDto?.totalPage);
      }
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error}`,
        ``
      )
    }
  };

  const onChangeSearchValue = useCallback((val : string) => {
    setSearchValue(val.trim());
  },[]);

  // const getMoreSpotList = async () => {
  //   try {
  //     const {data}: AxiosResponse = await spotAxios.post(`/spot?page=${page}&sort=${sort}`, spotRequest);
  //     if(data?.status === 'OK' && data?.message === 'success') {
  //       setSpotList([...spotList, data?.responseDto?.spotDtoList] as Spot[]);
  //     }
  //   } catch (error: any) {
  //     Alert.alert(
  //       `에러코드 ${error}`,
  //       ``
  //     )
  //   }
  // }

  const onSearchSubmit = () => {
    setSpotRequest({
      ...spotRequest, 
      searchValue
    } as SpotRequest);
  };

  

  const initSpotRequest = () => {
    const requestBody: SpotRequest = {
      "lat" : 0,
      "lng" : 0,
      "searchValue" : '',
      "limitDistance" : 0,
      "category" : '',
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
    console.log(spotRequest);
    if(!spotRequest)
      return;
    getSpotList();
  }, [spotRequest, page, sort]);

  // useEffect(() => {
  //   getMoreSpotList();
  // }, [page]);

  useEffect(()=> {
    console.log(spotList);
    console.log(totalPage);
  },[spotList, totalPage])

  return (
    <ScrollView>
      <SpotsTemplate 
        spotList={spotList} 
        totalPage={totalPage}
        userLocation={userLocation}
        onSearchSubmit={onSearchSubmit}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        />
    </ScrollView>
  );
}

export default Spots;