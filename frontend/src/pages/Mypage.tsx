import React from 'react';
import {Text, View} from 'react-native';
import {RootState} from '../store/reducer';
import {useSelector} from 'react-redux';
import MypageTemplate from '../templates/MypageTemplate';

function Mypage() {
  const userInfo = useSelector((state: RootState) => state.user);
  return (
    <View>
      <Text>마이 페이지</Text>
      <MypageTemplate userInfo={userInfo} />
    </View>
  );
}

export default Mypage;
