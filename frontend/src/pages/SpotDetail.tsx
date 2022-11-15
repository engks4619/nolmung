import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import SpotDetailTemplate from '~/templates/SpotDetailTemplate';
import {SpotDetailParamList} from './Spots';
import axios from 'utils/axios';

type SpotDetailProp = NativeStackScreenProps<SpotDetailParamList, 'SpotDetail'>;

const SpotDetail = ({route}: SpotDetailProp) => {
  const spotId: string = route.params.spotId;

  const lat = useSelector((state: RootState) => state.user.lat);
  const lng = useSelector((state: RootState) => state.user.lng);
  const spot = useState<any>();

  const getSpotDetail = async (spotId: string) => {
    const response = await axios.get(`spot/${spotId}?lat=${lat}&lng=${lng}`);
    console.log(response);
  };

  useEffect(() => {
    //산책스팟 디테일 정보 가져오기
    getSpotDetail(spotId);
  }, [spotId]);

  return <SpotDetailTemplate />;
};

export default SpotDetail;
