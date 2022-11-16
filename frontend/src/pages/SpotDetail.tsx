import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import SpotDetailTemplate from '~/templates/SpotDetailTemplate';
import {SpotDetailParamList} from './Spots';
import axios from 'utils/axios';
import CustomHeader from '~/headers/CustomHeader';
import {Alert} from 'react-native';
import {spot} from '~/utils/type';

type SpotDetailProp = NativeStackScreenProps<SpotDetailParamList, 'SpotDetail'>;

const SpotDetail = ({route, navigation}: SpotDetailProp) => {
  const spotId: string = route.params.spotId;

  const lat = useSelector((state: RootState) => state.user.lat);
  const lng = useSelector((state: RootState) => state.user.lng);
  const [spot, setSpot] = useState<spot>();

  const getSpotDetail = async (spotId: string) => {
    const response = await axios.get(`spot/${spotId}?lat=${lat}&lng=${lng}`);
    if (response.status === 200) {
      setSpot(response?.data?.spotDto);
      console.log(spot);
    } else {
      Alert.alert('상세 정보를 불러오지 못했습니다.');
    }
  };

  useEffect(() => {
    //산책스팟 디테일 정보 가져오기
    getSpotDetail(spotId);
  }, [spotId]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader navigation={navigation} middleText="스팟 상세" />
      ),
    });
  }, [navigation]);

  return <SpotDetailTemplate spot={spot} />;
};

export default SpotDetail;
