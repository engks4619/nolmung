import {AxiosResponse} from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import CustomHeader from '~/headers/customHeader';
import OppentTemplate from '~/templates/OppentTemplate';
import axios from '~/utils/axios';

export interface reviewerType {
  nickname: string;
  phone: string;
  profileImage: string;
  userIdx: number;
}
export interface reviewDataType {
  createdAt: string;
  owner: boolean;
  recoredIdx: string;
  review: string;
  star: number;
  reviewer: reviewerType;
  reviewee: reviewerType;
}

function Oppent({route, navigation}: any) {
  const oppentIdx = route.params.oppentIdx;
  const [isOwner, setIsOwner] = useState<boolean>(true);
  const [ownerReviews, setOwnerReviews] = useState<reviewDataType[]>([]);
  const [ptReviews, setPtReviews] = useState<reviewDataType[]>([]);
  const [oppentInfo, setOppentInfo] = useState<reviewerType>({});

  useEffect(() => {
    navigation.setOptions({
      header: () => <CustomHeader navigation={navigation} middleText="리뷰" />,
    });
  }, [navigation, oppentInfo]);

  const getOppentInfo = async (oppentId: number) => {
    try {
      const response: AxiosResponse = await axios.get(
        `user/history/reviewee/${oppentId}/true`,
      );
      const reviewData: reviewDataType[] = response.data;
      setOwnerReviews(reviewData);
      setOppentInfo(reviewData[0]?.reviewee);
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error.response.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
    try {
      const response: AxiosResponse = await axios.get(
        `user/history/reviewee/${oppentId}/false`,
      );
      const reviewData: reviewDataType[] = response.data;
      setPtReviews(reviewData);
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error.response.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  useEffect(() => {
    getOppentInfo(-1113611723);
  }, []);

  return (
    <OppentTemplate
      isOwner={isOwner}
      ownerReviews={ownerReviews}
      ptReviews={ptReviews}
      oppentInfo={oppentInfo}
      setIsOwner={setIsOwner}
    />
  );
}

export default Oppent;
