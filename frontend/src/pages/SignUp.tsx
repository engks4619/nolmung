import React, {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '~/../AppInner';
import SignUpTemplate from '~/templates/SignUpTemplate';
import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';
import {storeUserInfo} from '~/slices/userSlice';
import {useAppDispatch} from '~/store';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: SignUpScreenProps) {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isSend, setIsSend] = useState<Boolean>(false);
  const [certificationNum, setCertificationNum] = useState<string>('');
  const [isCertificated, setIsCertificated] = useState<Boolean>(false);
  const [btnName, setBtnName] = useState<string>('인증하기');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const onChangePhoneNumber = useCallback((text: string) => {
    var phoneInput = text.replace(/[^0-9]/g, '');
    if (phoneInput.length > 11) {
      return;
    }
    phoneInput = phoneInput.replace(/-/gi, '');
    phoneInput = phoneInput.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
    setPhoneNumber(phoneInput);
  }, []);

  const onSendMessageNumber = useCallback(async () => {
    if (phoneNumber.length < 13) {
      return Alert.alert('알림', '휴대폰 번호를 확인해주세요.');
    }
    if (isSend) {
      return Alert.alert('알림', '문자를 확인해주세요');
    } else if (isCertificated) {
      return Alert.alert('알림', '인증이 완료되었습니다.');
    } else if (phoneNumber.length === 13) {
      setIsSend(true);
      try {
        const response: AxiosResponse = await axios.post('user/cert', {
          phone: passwordCheck,
        });
        if (response.status === 200) {
          Alert.alert(
            '알림',
            '문자가 발송되었습니다. \n5분 안에 입력해주세요!',
          );
        }
      } catch (error: any) {
        Alert.alert(
          `에러코드 ${error.response.status}`,
          '죄송합니다. 다시 시도해주시길 바랍니다.',
        );
      }
    }
  }, [phoneNumber, isSend, btnName]);

  const onCheckMessageNumber = useCallback(async () => {
    if (certificationNum.length === 4 && phoneNumber.length === 13) {
      try {
        const response: AxiosResponse = await axios.post('user/cert/verify', {
          phone: phoneNumber,
          number: Number(certificationNum),
        });
        setBtnName('인증완료');
        setIsCertificated(true);
        setIsSend(false);
        Alert.alert('알림', '문자 인증이 완료되었습니다.');
      } catch (error: any) {
        console.error(error);
        if (error.response.status === 408) {
          Alert.alert(
            '알림',
            '시간이 경과하여 재시도 해주시길 바랍니다. 문자 인증은 1일 5회만 가능합니다.',
          );
          // setIsSend(false);
          setCertificationNum('');
          return;
        } else if (error.response.status === 400) {
          Alert.alert('알림', '인증번호를 다시 확인해주시길 바랍니다.');
          setCertificationNum('');
        }
        Alert.alert(
          `에러코드 ${error.response.status}`,
          '죄송합니다. 다시 시도해주시길 바랍니다.',
        );
      }
      // 시간이 지난 코드로 인증할 경우 setIsSend(false) && 문자 인증 1일 5회 제한
      // 다른 문자 번호로 인증할 경우 경고문만
    }
  }, [phoneNumber, certificationNum]);

  const onChangeCertificationNum = useCallback((text: string) => {
    var messageInput = text.replace(/[^0-9]/g, '');
    if (messageInput.length > 4) {
      return;
    }
    setCertificationNum(messageInput);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const onChangePasswordCheck = useCallback((text: string) => {
    setPasswordCheck(text.trim());
  }, []);

  const onSubmit = useCallback(async () => {
    if (!phoneNumber) {
      return Alert.alert('알림', '휴대폰 번호를 입력해주세요.');
    }
    if (!isCertificated) {
      return Alert.alert('알림', '휴대폰 인증을 진행해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    if (password !== passwordCheck) {
      return Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
    }
    try {
      const response: AxiosResponse = await axios.post('user', {
        phone: phoneNumber,
        password,
      });
      console.log('회원가입', response);
      // const {userIdx, phone, nickname, profileImage} = response.data;
      // const userInfo = {accessToken, userIdx, phone, nickname, profileImage};
      // storeUserInfo(userInfo, dispatch);
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error.response.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
    Alert.alert('알림', '회원가입 되었습니다.');
  }, [phoneNumber, certificationNum, password, passwordCheck]);

  return (
    <SignUpTemplate
      phoneNumber={phoneNumber}
      onChangePhoneNumber={onChangePhoneNumber}
      isSend={isSend}
      onSendMessageNumber={onSendMessageNumber}
      certificationNum={certificationNum}
      onChangeCertificationNum={onChangeCertificationNum}
      btnName={btnName}
      onCheckMessageNumber={onCheckMessageNumber}
      password={password}
      onChangePassword={onChangePassword}
      passwordCheck={passwordCheck}
      onChangePasswordCheck={onChangePasswordCheck}
      onSubmit={onSubmit}
    />
  );
}

export default SignUp;
