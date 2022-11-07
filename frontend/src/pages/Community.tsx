import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import CommunityTemplate from '@templates/CommunityTemplate';
import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';

export interface withPostListType {
  postIdx: number;
  writer: string;
  subject: string;
  modifyDate: string;
  location: string;
  walkDate: string;
  likeCnt: number;
  thumbnailUrl: string;
}

export interface otherPostListType extends withPostListType {
  pay: number;
}

function Community() {
  const [categoryType, setCategoryType] = useState<string>('WITH');
  const [withPgNum, setWithPgNum] = useState<number>(0);
  const [withPostList, setWithPostList] = useState<withPostListType[]>([]);
  const [otherPgNum, setOtherPgNum] = useState<number>(0);
  const [otherPostList, setOtherPostList] = useState<otherPostListType[]>([]);

  const navigateWithPg = () => {
    setCategoryType('WITH');
  };

  const navigateOtherPg = () => {
    setCategoryType('OTHER');
  };

  const getWithPostList = async (pgNum: number) => {
    const params = {
      page: pgNum,
    };
    try {
      const response: AxiosResponse = await axios.get('community/with', {
        params,
      });
      const data: withPostListType[] = await response.data.withDtoList;
      setWithPostList([...withPostList, ...data]);
      setWithPgNum(withPgNum + 1);
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error.response.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  const getOtherPostList = async (pgNum: number) => {
    const params = {
      page: pgNum,
    };
    try {
      const response: AxiosResponse = await axios.get('community/other', {
        params,
      });
      const data: otherPostListType[] = await response.data.otherDtoList;
      setOtherPostList([...otherPostList, ...data]);
      setOtherPgNum(otherPgNum + 1);
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error.response.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  const loadMore = () => {
    if (categoryType === 'WITH') {
      getWithPostList(withPgNum);
    } else {
      getOtherPostList(otherPgNum);
    }
  };

  useEffect(() => {
    loadMore();
  }, [categoryType]);

  return (
    <View>
      <CommunityTemplate
        navigateWithPg={navigateWithPg}
        navigateOtherPg={navigateOtherPg}
        categoryType={categoryType}
        withPostList={withPostList}
        otherPostList={otherPostList}
        loadMore={loadMore}
      />
    </View>
  );
}

export default Community;
