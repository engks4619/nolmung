import React, {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import SignInTemplate from '../templates/SignInTemplate';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const onChangePhoneNumber = useCallback(text => {
    var phoneInput = text.replace(/[^0-9]/g, '');
    if (phoneInput.length > 11) {
      return;
    }
    phoneInput = phoneInput.replace(/-/gi, '');
    phoneInput = phoneInput.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
    setPhoneNumber(phoneInput);
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);
  const onSubmit = useCallback(() => {
    if (!phoneNumber || !phoneNumber.trim()) {
      return Alert.alert('알림', '핸드폰 번호를 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    Alert.alert('알림', '로그인 되었습니다.');
  }, [phoneNumber, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <SignInTemplate
      onSubmit={onSubmit}
      toSignUp={toSignUp}
      phoneNumber={phoneNumber}
      password={password}
      onChangePhoneNumber={onChangePhoneNumber}
      onChangePassword={onChangePassword}
    />
  );
}

export default SignIn;
