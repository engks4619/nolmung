import React, { useState } from 'react';
import {Pressable, View, Text, Alert} from 'react-native';
import UserSummary from '@organisms/UserSummary';
import type {UserInfoType} from '@templates/MypageTemplate';
import MyButton from '@atoms/MyButton';

interface Props {
  userInfo: UserInfoType;
}

const showAlert = () =>
  Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Cancel",
        onPress: () => Alert.alert("Cancel Pressed"),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),
    }
  );

const editProfile = (): void => {
 showAlert();
};

// const onChangePassword = useCallback(text => {
//   setPassword(text.trim());
// }, []);
function MypageTemplate(props: Props) {
  return (
    <View>
      <UserSummary
        imageSource={props.userInfo.imageSource}
        userName={props.userInfo.userName}
        walkNumber={props.userInfo.walkNumber}
        walkHour={props.userInfo.walkHour}
        walkDistance={props.userInfo.walkHour}
      />
      <MyButton
        btnText="프로필 수정"
        width={350}
        paddingVertical={3}
        onClick={editProfile}
        backgroundColor="#D9D9D9"
        height={25}
        fontSize={12}
      />
      <Pressable
        onPress={()=>showAlert()}>
        <Text>{'내가 쓴 글'}</Text>
      </Pressable>
      <Pressable
        onPress={()=>showAlert()}>
        <Text>{'찜한 글'}</Text>
      </Pressable>
      <Pressable
        onPress={()=>showAlert()}>
        <Text>{'찜한 스팟'}</Text>
      </Pressable>
      <Pressable
        onPress={()=>showAlert()}>
        <Text>{'산책 기록'}</Text>
      </Pressable>
      <Pressable
        onPress={()=>showAlert()}>
        <Text>{'로그아웃'}</Text>
      </Pressable>
      <Pressable
        onPress={()=>showAlert()}>
        <Text>{'회원탈퇴'}</Text>
      </Pressable>
    </View>
  );
}

export default MypageTemplate;
