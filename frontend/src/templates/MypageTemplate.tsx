import React from 'react';
import {View, GestureResponderEvent} from 'react-native';
import UserSummary from '@organisms/UserSummary';
import type {UserInfoType} from '../pages/Mypage';
import MyButton from '@atoms/MyButton';
import TabButtonGroup from '@molecules/TabButtonGroup';
import {TabButtonObject} from '@molecules/TabButtonGroup';
import UserEditForm from '~/organisms/UserEditForm';

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
const logout = () => {
  //logout 실행
  console.log('로그아웃!');
};

function MypageTemplate(props: Props) {
  return (
    <View>
      {props.isEditing ? (
        <UserEditForm
          imageSource={props.userInfo.imageSource}
          userName={props.userInfo.userName}
          value={props.value}
          onChangeText={props.onChangeNickname}
          isPassword={false}
        />
      ) : (
        <UserSummary
          imageSource={props.userInfo.imageSource}
          userName={props.userInfo.userName}
          walkNumber={props.userInfo.walkNumber}
          walkHour={props.userInfo.walkHour}
          walkDistance={props.userInfo.walkHour}
        />
      )}
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
        func={(params?: string) => {
          props.navigation.navigate(params);
        }}
      />
      <TabButtonGroup TabButtonList={props.TabButtonListFunc} func={logout} />
    </View>
  );
}

export default MypageTemplate;
