import {AxiosResponse} from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import OppentTemplate from '~/templates/OppentTemplate';
import axios from '~/utils/axios';

interface reviewDataType {
  owner: boolean;
  recoredIdx: string;
  review: string;
  start: number;
}

function Oppent({route}: any) {
  const oppentIdx = route.params.oppentIdx;
  const [reviews, setRevies] = useState<reviewDataType[]>([]);
  const [partTimeNum, setPartTimeNum] = useState<number>(0);

  const getOppentInfo = async (oppentId: number) => {
    try {
      const response: AxiosResponse = await axios.get(
        `user/history/${oppentId}`,
      );
      const reviewData: reviewDataType[] = response.data;
      setRevies(reviewData);
      console.log(reviewData);
      const notOwner = reviewData.reduce((cnt, review) => {
        !review.owner ? cnt++ : null;
        return cnt;
      }, 0);
      setPartTimeNum(notOwner);
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error.response.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  useEffect(() => {
    getOppentInfo(-1650769681);
  }, []);

  return (
    <OppentTemplate
      partTimeNum={partTimeNum}
      useNum={reviews?.length - partTimeNum}
    />
  );
}

export default Oppent;
