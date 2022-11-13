import React, {useState, useEffect} from 'react';
import {ScrollView, Alert} from 'react-native';
import MainTemplate from '@templates/MainTemplate';
import axios from '~/utils/axios';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';

function Main() {
  const [mainPostList, setMainPostList] = useState([]);
  const [mainSpotList, setMainSpotList] = useState([]);
  const lat = useSelector((state: RootState) => state.user.lat);
  const lng = useSelector((state: RootState) => state.user.lng);

  const userName = useSelector((state: RootState) => state.user.nickname);
  const profileImage = useSelector(
    (state: RootState) => state.user.profileImage,
  );

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

  useEffect(() => {
    getMainPostList();
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
      />
    </ScrollView>
  );
}

export default Main;
