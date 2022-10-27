import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TextLine from '~/atoms/TextLine';

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
      <Text style={styles.label}>{labelText}</Text>
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
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  inputWrapper: {
    padding: 20,
  },
});

export default LoginInput;
