import React, {useState, useEffect} from 'react';
import {ScrollView, Alert} from 'react-native';
import MainTemplate from '@templates/MainTemplate';
import axios from '~/utils/axios';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {AxiosResponse} from 'axios';
import {useAppDispatch} from '~/store';
import {setDogsInfo, setSelectedMyDogs} from '~/slices/dogsSlice';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
//로깅시작함수
import {startWalking} from '~/utils/MyPositionFunctions';
import MapViewAlone from '@pages/MapViewAlone';
import LogView from '@pages/LogView';

const MainPageStack = createNativeStackNavigator();
export const MainPageNavigator = () => (
  <MainPageStack.Navigator>
    <MainPageStack.Screen
      name="MainPage"
      component={Main}
      options={{headerShown: false}}
    />
    <MainPageStack.Screen
      name="MapViewAlone"
      component={MapViewAlone}
      options={{headerShown: true}}
    />
    <MainPageStack.Screen
      name="LogView"
      component={LogView}
      options={{headerShown: true}}
    />
  </MainPageStack.Navigator>
);

function Main({navigation}: any) {
  const [mainPostList, setMainPostList] = useState([]);
  const [mainSpotList, setMainSpotList] = useState([]);
  const lat = useSelector((state: RootState) => state.user.lat);
  const lng = useSelector((state: RootState) => state.user.lng);

  const userName = useSelector((state: RootState) => state.user.nickname);
  const dispatch = useAppDispatch();
  const profileImage = useSelector(
    (state: RootState) => state.user.profileImage,
  );
  // 산책 시작 함수
  const myPositionState = useSelector((state: RootState) => state.myPosition);
  // const dogsInfo = useSelector((state: RootState) => state.dogs.dogsInfo);
  const selectedDogs = useSelector(
    (state: RootState) => state.dogs.selectedDogsInfo,
  );

  const goWalking = () => {
    startWalking(dispatch, navigation, myPositionState, selectedDogs);
  };
  const getMainPostList = async () => {
    try {
      const {data} = await axios.get('community/main');
      setMainPostList(data);
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error.response.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  const getMainSpotList = async () => {
    const params = {
      page: 0,
      sort: 0,
    };
    try {
      const {data} = await axios({
        method: 'post',
        url: 'spot',
        data: {
          lat,
          lng,
          searchValue: null,
          limitDistance: 0,
          category: null,
        },
        params,
      });
      setMainSpotList(data.spotDtoList);
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error.response.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  const getMyDogs = async () => {
    const response: AxiosResponse = await axios.get('user/dog/mydogs');
    dispatch(setDogsInfo(response.data));
    if (response.data.length >= 1) {
      dispatch(setSelectedMyDogs([1]));
    }
  };

  useEffect(() => {
    getMainPostList();
    getMyDogs();
  }, []);

  useEffect(() => {
    getMainSpotList();
  }, [lat, lng]);

  return (
    <ScrollView>
      <MainTemplate
        spots={mainSpotList}
        mainPostList={mainPostList}
        userName={userName}
        profileImage={profileImage}
        goWalking={goWalking}
      />
    </ScrollView>
  );
}

export default Main;
