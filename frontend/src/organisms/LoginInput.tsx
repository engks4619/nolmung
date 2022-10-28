import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextLine from '../atoms/TextLine';
import Label from '../atoms/Label';

interface Props {
  labelText: string;
  placeholder: string;
  value: string;
  onChangeText: Function;
  autoComplete: string;
  isPassword: Boolean;
}

function LoginInput({
  labelText,
  placeholder,
  value,
  onChangeText,
  autoComplete,
  isPassword,
}: Props) {
  return (
    <View style={styles.inputWrapper}>
      <Label labelText={labelText} />
      <TextLine
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        autoComplete={autoComplete}
        isPassword={isPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
});

export default LoginInput;
