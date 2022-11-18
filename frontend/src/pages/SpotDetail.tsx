import React, {useEffect} from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import SpotDetailTemplate from '~/templates/SpotDetailTemplate';
import axios from 'utils/axios';
import CustomHeader from '~/headers/CustomHeader';
import {Alert} from 'react-native';
import {review, spot} from '~/utils/type';
import {getTextAddress} from '~/utils/addressService';

const SpotDetail = ({route, navigation}: any) => {
  const spotId: string = route.params.spotId;

  const lat = useSelector((state: RootState) => state.user.lat);
  const lng = useSelector((state: RootState) => state.user.lng);
  const [spot, setSpot] = useState<spot | null>(null);
  const [textAddress, setTextAddress] = useState<string>('');
  const [reviewList, setReviewList] = useState<review[]>([]);

  const getSpotDetail = async (spotId: string) => {
    try {
      const response = await axios.get(`spot/${spotId}?lat=${lat}&lng=${lng}`);
      if (response.status === 200) {
        setSpot(response?.data?.spotDto);
        setReviewList(response?.data?.reviewList);
      } else {
        Alert.alert('상세 정보를 불러오지 못했습니다.');
      }
    } catch (err) {
      Alert.alert('상세 정보를 불러오지 못했습니다.');
    }
  };

  const deleteSpotReview = async (reviewIdx: number) => {
    try {
      const response = await axios.delete(`spot/spot-review/${reviewIdx}`);
      if (response.status === 200) {
        Alert.alert('삭제 완료!');
        navigation.replace('SpotDetail', {spotId});
      }
    } catch (err) {
      Alert.alert('리뷰 삭제 실패');
    }
  };
  const getAddress = async () => {
    if (spot?.lat && spot?.lng) {
      const response = await getTextAddress(spot?.lat, spot?.lng);
      if (response.status === 200) {
        const address = response.data.documents[0].address;
        const text =
          address.region_2depth_name +
          ' ' +
          address.region_3depth_name +
          ' ' +
          address.main_address_no +
          (address.sub_address_no ? '-' + address.sub_address_no : '');
        setTextAddress(text);
      }
    }
  };

  useEffect(() => {
    //산책스팟 디테일 정보 가져오기
    getSpotDetail(spotId);
  }, [spotId]);

  useEffect(() => {
    if (spot) {
      getAddress();
    }
  }, [spot]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader
          backFunc={() => navigation.navigate('Spots')}
          navigation={navigation}
          middleText={spot?.name ?? '스팟 상세'}
        />
      ),
    });
  }, [navigation, spot]);

  return (
    <SpotDetailTemplate
      spot={spot}
      reviewList={reviewList}
      textAddress={textAddress}
      deleteSpotReview={deleteSpotReview}
    />
  );
};

export default SpotDetail;
