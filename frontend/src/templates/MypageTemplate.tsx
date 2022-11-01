import React from 'react';
import {Pressable, View, Text} from 'react-native';
import UserSummary from '@organisms/UserSummary';
import type {UserInfoType} from '@templates/MypageTemplate';
import MyButton from '@atoms/MyButton';

interface Props {
  userInfo: UserInfoType;
}

const funcKim = (): void => {
  console.log('123');
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
        onClick={funcKim}
        backgroundColor="#D9D9D9"
        height={25}
        fontSize={12}
      />
      <Pressable
        onPress={() => {
          // navigate;
        }}>
        <Text>{'내가 쓴 글'}</Text>
      </Pressable>
    </View>
  );
}

export default MypageTemplate;
