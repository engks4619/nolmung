import React from 'react';
import {View, GestureResponderEvent} from 'react-native';
import UserSummary from '@organisms/UserSummary';
import type {UserInfoType} from '../pages/Mypage';
import MyButton from '@atoms/MyButton';
import TabButtonGroup from '@molecules/TabButtonGroup';
import {TabButtonObject} from '@molecules/TabButtonGroup';

interface Props {
  userInfo: UserInfoType;
  isEditing: boolean;
  profileEdit: (event: GestureResponderEvent) => void;
  onChangeNickname: Function;
  value: string;
  TabButtonListNavi: Array<TabButtonObject>;
  TabButtonListFunc: Array<TabButtonObject>;
  navigation: any;
}

function MypageTemplate(props: Props) {
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

      <TabButtonGroup
        TabButtonList={props.TabButtonListNavi}
        navigation={props.navigation}
      />
      <TabButtonGroup
        TabButtonList={props.TabButtonListFunc}
        navigation={props.navigation}
      />
    </View>
  );
}

export default MypageTemplate;
