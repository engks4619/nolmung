import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {MAIN_COLOR} from '~/const';

interface Props {
  placeholder?: string;
  value: string;
  onChangeText: Function;
  autoComplete: string;
  isPassword: Boolean;
  keyboardType?: string;
}

function TextLine({
  placeholder,
  onChangeText,
  value,
  autoComplete,
  isPassword,
  keyboardType = 'default',
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const customOnFocus = () => {
    setIsFocused(true);
  };
  const customOnBlur = () => {
    setIsFocused(false);
  };

  return (
    <TextInput
      style={isFocused ? styles.textActive : styles.textInput}
      placeholder={placeholder}
      placeholderTextColor="#666"
      importantForAutofill="yes"
      onChangeText={text => onChangeText(text)}
      value={value}
      returnKeyType="next"
      autoComplete={autoComplete}
      blurOnSubmit={!isPassword}
      secureTextEntry={isPassword}
      keyboardType={keyboardType}
      onFocus={customOnFocus}
      onBlur={customOnBlur}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    borderBottomWidth: 0.9,
  },
  textActive: {
    borderBottomColor: MAIN_COLOR,
    padding: 5,
    borderBottomWidth: 1,
  },
});

export default TextLine;
