import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

interface Props {
  placeholder?: string;
  value: string;
  onChangeText: Function;
  autoComplete: string;
  isPassword: Boolean;
}

function TextLine({
  placeholder,
  onChangeText,
  value,
  autoComplete,
  isPassword,
}: Props) {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      placeholderTextColor="#666"
      importantForAutofill="yes"
      onChangeText={text => onChangeText(text)}
      value={value}
      returnKeyType="next"
      autoComplete={autoComplete}
      blurOnSubmit={!isPassword}
      secureTextEntry={isPassword}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    borderBottomWidth: 0.5,
  },
});

export default TextLine;
