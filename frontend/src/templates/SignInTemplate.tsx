import React from 'react';
import {Pressable, Text, StyleSheet, Image, View} from 'react-native';
import DismissKeyboardView from '../DismissKeyboardView';
import MyButton from '~/atoms/MyButton';
import LoginInput from '~/organisms/LoginInput';

interface Props {
  onSubmit: Function;
  toSignUp: Function;
  phoneNumber: string;
  password: string;
  onChangePhoneNumber: Function;
  onChangePassword: Function;
}

function SignInTemplate({
  onSubmit,
  toSignUp,
  phoneNumber,
  password,
  onChangePhoneNumber,
  onChangePassword,
}: Props) {
  return (
    <DismissKeyboardView>
      <Text style={StyleSheet.compose(styles.textCenter, styles.logoText)}>
        강아지와 추억을 쌓아보세요!
      </Text>
      <View style={styles.logoContainer}>
        <Image source={require('~/assets/logo.png')} style={styles.logo} />
      </View>
      <LoginInput
        labelText="핸드폰 번호"
        placeholder="핸드폰 번호를 입력해주세요"
        value={phoneNumber}
        onChangeText={onChangePhoneNumber}
        autoComplete="tel-device"
        isPassword={false}
        keyboardType={'number-pad'}
      />
      <LoginInput
        labelText="비밀번호"
        placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
        value={password}
        onChangeText={onChangePassword}
        autoComplete="password"
        isPassword={true}
      />
      <MyButton
        btnText="로그인"
        width={200}
        paddingVertical={15}
        onClick={onSubmit}
      />
      <Pressable onPress={() => toSignUp()}>
        <Text style={styles.textCenter}>회원가입하기</Text>
      </Pressable>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  logoText: {
    fontWeight: '700',
    fontSize: 20,
    marginTop: 80,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: '50%',
    height: 200,
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default SignInTemplate;
