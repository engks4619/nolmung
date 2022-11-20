import React, {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '~/../AppInner';
import SignInTemplate from '@templates/SignInTemplate';
import {storeUserInfo} from '~/slices/userSlice';
import axios from '~/utils/axios';
import {useDispatch} from 'react-redux';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const dispatch = useDispatch();

  const postSignIn = async (phoneNum: string, password: string) => {
    const data = {
      phone: phoneNum,
      password,
    };
    try {
      const response = await axios.post('user/login', data);
      const accessToken = response.headers.token;
      const {userIdx, phone, nickname, profileImage} = response.data;
      const userInfo = {accessToken, userIdx, phone, nickname, profileImage};
      storeUserInfo(userInfo, dispatch);
      axios.defaults.headers.common['Authorization'] = accessToken;
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error.response.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  const onChangePhoneNumber = useCallback((text: string) => {
    var phoneInput = text.replace(/[^0-9]/g, '');
    if (phoneInput.length > 11) {
      return;
    }
    phoneInput = phoneInput.replace(/-/gi, '');
    phoneInput = phoneInput.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
    setPhoneNumber(phoneInput);
  }, []);
  const onChangePassword = useCallback((text: string) => {
    setInputPassword(text.trim());
  }, []);
  const onSubmit = useCallback(() => {
    if (!phoneNumber || !phoneNumber.trim()) {
      return Alert.alert('알림', '핸드폰 번호를 입력해주세요.');
    }
    if (!inputPassword || !inputPassword.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    postSignIn(phoneNumber, inputPassword);
  }, [phoneNumber, inputPassword]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <SignInTemplate
      onSubmit={onSubmit}
      toSignUp={toSignUp}
      phoneNumber={phoneNumber}
      password={inputPassword}
      onChangePhoneNumber={onChangePhoneNumber}
      onChangePassword={onChangePassword}
    />
  );
}

export default SignIn;
