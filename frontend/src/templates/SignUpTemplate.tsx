import React from 'react';
import DismissKeyboardView from '../DismissKeyboardView';
import MyButton from '../atoms/MyButton';
import LoginInput from '../organisms/LoginInput';
import CertificationForm from '../organisms/CertificationForm';

interface Props {
  phoneNumber: string;
  onChangePhoneNumber: (text: string) => void;
  isSend: Boolean;
  onSendMessageNumber: (text: string) => void;
  certificationNum: string;
  btnName: string;
  onCheckMessageNumber: (text: string) => void;
  password: string;
  onChangePassword: (text: string) => void;
  passwordCheck: string;
  onChangePasswordCheck: Function;
  onChangeCertificationNum: Function;
  onSubmit: () => void;
}

function SignUpTemplate({
  phoneNumber,
  onChangePhoneNumber,
  isSend,
  onSendMessageNumber,
  certificationNum,
  btnName,
  onCheckMessageNumber,
  onChangeCertificationNum,
  password,
  onChangePassword,
  onSubmit,
  passwordCheck,
  onChangePasswordCheck,
}: Props) {
  return (
    <DismissKeyboardView>
      <CertificationForm
        labelText="휴대폰 번호"
        placeholder="휴대폰 번화를 입력해주세요."
        btnText={btnName}
        value={phoneNumber}
        autoComplete="tel-device"
        onChangeText={onChangePhoneNumber}
        onClick={onSendMessageNumber}
        keyboardType={'number-pad'}
      />
      {isSend ? (
        <CertificationForm
          labelText="인증번호"
          placeholder="인증번호 4자리르 입력해주세요."
          btnText="확인"
          value={certificationNum}
          autoComplete="sms-otp"
          onChangeText={onChangeCertificationNum}
          onClick={onCheckMessageNumber}
        />
      ) : (
        true
      )}
      <LoginInput
        labelText="비밀번호"
        placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
        value={password}
        onChangeText={onChangePassword}
        autoComplete="password"
        isPassword={true}
      />
      <LoginInput
        labelText="비밀번호 확인"
        placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
        value={passwordCheck}
        onChangeText={onChangePasswordCheck}
        autoComplete="password"
        isPassword={true}
      />
      <MyButton
        btnText="회원가입"
        width={200}
        paddingVertical={10}
        onClick={onSubmit}
      />
    </DismissKeyboardView>
  );
}

export default SignUpTemplate;
