import React, {useState} from 'react';
import {View, GestureResponderEvent} from 'react-native';
import UserSummary from '@organisms/UserSummary';
import type {UserInfoType} from '../pages/Mypage';
import MyButton from '@atoms/MyButton';
import TabButton from '@atoms/TabButton';
import {NavigationContainer} from '@react-navigation/native';
import TabButtonGroup from '@molecules/TabButtonGroup';
import {TabButtonObject} from '@molecules/TabButtonGroup';

interface Props {
  userInfo: UserInfoType;
  isEditing: boolean;
  profileEdit: (event: GestureResponderEvent) => void;
  onChangeNickname: Function;
  value: string;
  onClick: (whereToGo: string) => void;
  TabButtonList: Array<TabButtonObject>;
  TabButtonList2: Array<TabButtonObject>;
}

// const onChangePassword = useCallback(text => {
//   setPassword(text.trim());
// }, []);

function MypageTemplate(props: Props) {
  // const abc = (): void => {
  //   navigation.navigate('MyPostList');
  //   // console.log('2')
  // };
  //***** 여기서 navigation navigate 못 받아옴 undefined로 나옴 문제 해결 notion 볼것* */
  return (
    <View>
      <UserSummary
        imageSource={props.userInfo.imageSource}
        userName={props.userInfo.userName}
        walkNumber={props.userInfo.walkNumber}
        walkHour={props.userInfo.walkHour}
        walkDistance={props.userInfo.walkHour}
        isEditing={props.isEditing}
        onChangeText={props.onChangeNickname}
        value={props.value}
      />
      <MyButton
        btnText={props.isEditing ? '수정 완료' : '프로필 수정'}
        width={350}
        paddingVertical={3}
        onClick={props.profileEdit}
        backgroundColor="#D9D9D9"
        height={25}
        fontSize={12}
      />

      <TabButtonGroup TabButtonList={props.TabButtonList} />
      <TabButtonGroup TabButtonList={props.TabButtonList2} />
    </View>
  );
}

export default MypageTemplate;
