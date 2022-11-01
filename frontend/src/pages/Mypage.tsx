import React from 'react';
import {Text, View} from 'react-native';
// import {RootState} from '../store/reducer';
// import {useSelector} from 'react-redux';
import MypageTemplate from '../templates/MypageTemplate';

//UserInfoType
type UserInfoType = {
  imageSource: string;
  userName: string;
  walkNumber: number;
  walkHour: number;
  walkDistance: number;
};

//dummy
const userInfo: UserInfoType = {
  imageSource:
    'http://image.dongascience.com/Photo/2020/03/d2bb40617ababa299660cccc0442f993.jpg',
  userName: '윤성도짱짱',
  walkNumber: 10,
  walkHour: 10,
  walkDistance: 100,
};

function Mypage() {
  // const userInfo = useSelector((state: RootState) => state.user);
  return (
    <View>
      <Text>마이 페이지</Text>
      <MypageTemplate userInfo={userInfo} />
    </View>
  );
}

export type {UserInfoType};
export default Mypage;
