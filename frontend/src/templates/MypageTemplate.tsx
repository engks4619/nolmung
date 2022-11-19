import React from 'react';
import {
  View,
  GestureResponderEvent,
  StyleSheet,
  Dimensions,
} from 'react-native';
import UserSummary from '@organisms/UserSummary';
import type {UserInfoType} from '../pages/Mypage';
import MyButton from '@atoms/MyButton';
import TabButtonGroup from '@molecules/TabButtonGroup';
import {TabButtonObject} from '@molecules/TabButtonGroup';
import UserEditForm from '~/organisms/UserEditForm';
import {removeUserInfo} from '~/../AppInner';
interface Props {
  userInfo: UserInfoType;
  isEditing: boolean;
  profileEdit: (event: GestureResponderEvent) => void;
  onChangeNickname: Function;
  value: string;
  TabButtonListNavi: Array<TabButtonObject>;
  TabButtonListFunc: Array<TabButtonObject>;
  navigation: any;
  openPicker: () => Promise<void>;
}
const logout = () => {
  removeUserInfo();
};

function MypageTemplate(props: Props) {
  return (
    <View style={styles.myPageContainer}>
      <View style={styles.profileContainer}>
        {props.isEditing ? (
          <UserEditForm
            imageSource={props.userInfo.imageSource}
            userName={props.userInfo.userName}
            value={props.value}
            onChangeText={props.onChangeNickname}
            isPassword={false}
            openPicker={props.openPicker}
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
      </View>
      <MyButton
        btnText={props.isEditing ? '수정 완료' : '프로필 수정'}
        width={Dimensions.get('screen').width * 0.9}
        onClick={props.profileEdit}
        backgroundColor="#D9D9D9"
        height={25}
        fontSize={12}
      />
      <View style={styles.buttonGroupContainer}>
        <TabButtonGroup
          TabButtonList={props.TabButtonListNavi}
          func={(params?: string) => {
            props.navigation.navigate(params);
          }}
        />
        <TabButtonGroup TabButtonList={props.TabButtonListFunc} func={logout} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  myPageContainer: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    width: '100%',
    height: 93,
  },
  buttonGroupContainer: {
    width: Dimensions.get('screen').width * 0.9,
  },
});
export default MypageTemplate;
