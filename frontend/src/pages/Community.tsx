import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommunityTemplate from '@templates/CommunityTemplate';
import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';
import CommDetail from '@pages/CommDetail';
import {MAIN_COLOR} from '~/const';

export type CommunityParamList = {
  Community: undefined;
  CommDetail: {postIdx: number};
};

const CommunityStack = createNativeStackNavigator();

export const CommunityStackNavigator = () => (
  <CommunityStack.Navigator>
    <CommunityStack.Screen
      name="Community"
      component={Community}
      options={{
        headerTitle: '놀면 멍하니',
        headerTintColor: MAIN_COLOR,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 15,
        },
      }}
    />
    <CommunityStack.Screen
      name="CommDetail"
      component={CommDetail}
      options={{
        headerTitle: '게시글',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 15,
        },
      }}
    />
  </CommunityStack.Navigator>
);

export interface withPostListType {
  postIdx: number;
  writer: string;
  subject: string;
  modifyDate: string;
  location: string;
  walkDate: string;
  likeCnt: number;
  thumbnailUrl: string;
  userImgUrl: string;
}

export interface otherPostListType extends withPostListType {
  pay: number;
}

function Community() {
  const [categoryType, setCategoryType] = useState<string>('WITH');
  const [withPgNum, setWithPgNum] = useState<number>(0);
  const [withPostList, setWithPostList] = useState<withPostListType[]>([]);
  const [withTotalPg, setWithTotalPg] = useState<number>(0);
  const [otherPgNum, setOtherPgNum] = useState<number>(0);
  const [otherPostList, setOtherPostList] = useState<otherPostListType[]>([]);
  const [otherTotalPg, setOtherTotalPg] = useState<number>(0);

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
    if (pgNum > withTotalPg) {
      return;
    }
    try {
      const response: AxiosResponse = await axios.get('community/with', {
        params,
      });
      const data: withPostListType[] = await response.data.withDtoList;
      setWithPostList([...withPostList, ...data]);
      setWithTotalPg(response.data.totalPage);
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
    if (pgNum > otherTotalPg) {
      return;
    }
    try {
      const response: AxiosResponse = await axios.get('community/other', {
        params,
      });
      const data: otherPostListType[] = await response.data.otherDtoList;
      setOtherPostList([...otherPostList, ...data]);
      setOtherPgNum(otherPgNum + 1);
      setOtherTotalPg(response.data.totalPage);
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
    <CommunityTemplate
      navigateWithPg={navigateWithPg}
      navigateOtherPg={navigateOtherPg}
      categoryType={categoryType}
      withPostList={withPostList}
      otherPostList={otherPostList}
      loadMore={loadMore}
    />
  );
}

export default Community;
