import React, {useCallback, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../DismissKeyboardView';
import SignUpTemplate from '~/templates/SignUpTemplate';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: SignUpScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSend, setIsSend] = useState(false);
  const [certificationNum, setCertificationNum] = useState('');
  const [isCertificated, setIsCertificated] = useState(false);
  const [btnName, setBtnName] = useState('인증하기');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const onChangePhoneNumber = useCallback(text => {
    var phoneInput = text.replace(/[^0-9]/g, '');
    if (phoneInput.length > 11) {
      return;
    }
    phoneInput = phoneInput.replace(/-/gi, '');
    phoneInput = phoneInput.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
    setPhoneNumber(phoneInput);
  }, []);
  const onSendMessageNumber = useCallback(() => {
    if (phoneNumber.length < 13) {
      return Alert.alert('알림', '휴대폰 번호를 확인해주세요.');
    }
    if (isSend) {
      return Alert.alert('알림', '문자를 확인해주세요');
    } else if (isCertificated) {
      return Alert.alert('알림', '인증이 완료되었습니다.');
    } else if (phoneNumber.length === 13) {
      // api 요청 보내기
      setIsSend(true);
    }
  }, [phoneNumber, isSend, btnName]);
  const onCheckMessageNumber = useCallback(() => {
    if (certificationNum.length === 4 && phoneNumber.length === 13) {
      // api 요청으로 같은지 확인
      setBtnName('인증완료');
      setIsCertificated(true);
      setIsSend(false);
      Alert.alert('알림', '문자 인증이 완료되었습니다.');
      // 시간이 지난 코드로 인증할 경우 setIsSend(false) && 문자 인증 1일 5회 제한
      // 다른 문자 번호로 인증할 경우 경고문만
    }
  }, [phoneNumber, certificationNum]);
  const onChangeCertificationNum = useCallback(text => {
    var messageInput = text.replace(/[^0-9]/g, '');
    if (messageInput.length > 4) {
      return;
    }
    setCertificationNum(messageInput);
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);
  const onChangePasswordCheck = useCallback(text => {
    setPasswordCheck(text.trim());
  }, []);
  const onSubmit = useCallback(() => {
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
    Alert.alert('알림', '회원가입 되었습니다.');
  }, [phoneNumber, certificationNum, password, passwordCheck]);

  return (
    <DismissKeyboardView>
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
    </DismissKeyboardView>
  );
}

export default SignUp;
