import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommunityTemplate from '@templates/CommunityTemplate';
import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';
import CommDetail from '@pages/CommDetail';
import RegistArticle from '@pages/RegistArticle';
import Oppent from '@pages/Oppent';
import moment from 'moment';

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
  const endTime = new Date().setDate(new Date().getHours() + 20);

  const [categoryType, setCategoryType] = useState<string>('WITH');
  const [withPgNum, setWithPgNum] = useState<number>(0);
  const [withPostList, setWithPostList] = useState<withPostListType[]>([]);
  const [withTotalPg, setWithTotalPg] = useState<number>(0);
  const [otherPgNum, setOtherPgNum] = useState<number>(0);
  const [otherPostList, setOtherPostList] = useState<otherPostListType[]>([]);
  const [otherTotalPg, setOtherTotalPg] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [startDateModal, setStartDateModal] = useState<boolean>(false);
  const [endDateModal, setEndDateModal] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndtDate] = useState<Date>(moment(endTime).toDate());
  const [startPay, setStartPay] = useState<number>(0);
  const [endPay, setEndPay] = useState<number>(100000);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedSido, setSelectedSido] = useState('');
  const [selectedSigugun, setSelectedSigugun] = useState('');
  const [selectedDong, setSelectedDong] = useState('');
  const [selectedBreed, setSelectedBreed] = useState<number>(-1);
  const [requestBody, setRequestBody] = useState({});

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

  const searchWithPost = async () => {
    const body = {
      startWalkDate: startDate,
      endWalkDate: endDate,
      dogBreed: -1 ? null : selectedBreed,
      title: searchValue.trim() !== '' ? searchValue.trim() : null,
      address: selectedSido + ' ' + selectedSigugun + ' ' + selectedDong,
    };
    await axios
      .post(`community/search/with/?page=0`, body)
      .then(response => setWithPostList([...response.data.withDtoList]));
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
      searching={searching}
      setSearching={setSearching}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      startDateModal={startDateModal}
      setStartDateModal={setStartDateModal}
      endDateModal={endDateModal}
      setEndDateModal={setEndDateModal}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndtDate}
      requestBody={requestBody}
      setRequestBody={setRequestBody}
      startPay={startPay}
      setStartPay={setStartPay}
      endPay={endPay}
      setEndPay={setEndPay}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      selectedSido={selectedSido}
      setSelectedSido={setSelectedSido}
      selectedSigugun={selectedSigugun}
      setSelectedSigugun={setSelectedSigugun}
      selectedDong={selectedDong}
      setSelectedDong={setSelectedDong}
      selectedBreed={selectedBreed}
      setSelectedBreed={setSelectedBreed}
      searchWithPost={searchWithPost}
    />
  );
}

export default Community;
