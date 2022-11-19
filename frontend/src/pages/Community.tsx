import React, {useState, useEffect} from 'react';
import {Alert, Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommunityTemplate from '@templates/CommunityTemplate';
import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';
import CommDetail from '@pages/CommDetail';
import RegistArticle from '@pages/RegistArticle';
import {MAIN_COLOR} from '~/const';
import Oppent from '@pages/Oppent';
import RegistHeader from '~/organisms/RegistHeader';

export type CommunityParamList = {
  Community: undefined;
  CommDetail: {postIdx: number};
  RegistArticle: undefined;
  Oppent: {oppentIdx: number};
};

const CommunityStack = createNativeStackNavigator();

export const CommunityStackNavigator = () => (
  <CommunityStack.Navigator>
    <CommunityStack.Screen
      name="Community"
      component={Community}
      options={{
        headerShown: false,
      }}
    />
    <CommunityStack.Screen name="CommDetail" component={CommDetail} />
    <CommunityStack.Screen name="RegistArticle" component={RegistArticle} />
    <CommunityStack.Screen name="Oppent" component={Oppent} />
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
  chatCnt: number;
}

export interface otherPostListType extends withPostListType {
  pay: number;
}

function Community({navigation}: any) {
  const [categoryType, setCategoryType] = useState<string>('WITH');
  const [withPgNum, setWithPgNum] = useState<number>(0);
  const [withPostList, setWithPostList] = useState<withPostListType[]>([]);
  const [withTotalPg, setWithTotalPg] = useState<number>(0);
  const [otherPgNum, setOtherPgNum] = useState<number>(0);
  const [otherPostList, setOtherPostList] = useState<otherPostListType[]>([]);
  const [otherTotalPg, setOtherTotalPg] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const navigateWithPg = () => {
    setCategoryType('WITH');
  };

  const navigateOtherPg = () => {
    setCategoryType('OTHER');
  };

  const getWithPostList = async (pgNum: number, isRefresh?: boolean) => {
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
      if (isRefresh) {
        setWithPostList([...data]);
        setWithPgNum(1);
      } else {
        setWithPostList([...withPostList, ...data]);
        setWithPgNum(withPgNum + 1);
      }
      setWithTotalPg(response.data.totalPage);
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error.response.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  const getOtherPostList = async (pgNum: number, isRefresh?: boolean) => {
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
      if (isRefresh) {
        setOtherPostList([...data]);
        setOtherPgNum(1);
      } else {
        setOtherPostList([...otherPostList, ...data]);
        setOtherPgNum(otherPgNum + 1);
      }
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
      navigation={navigation}
      refreshing={refreshing}
      setRefreshing={setRefreshing}
      getWithPostList={getWithPostList}
      getOtherPostList={getOtherPostList}
    />
  );
}

export default Community;
