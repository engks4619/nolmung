import React from 'react';
import TextLine from '../atoms/TextLine';
import Label from '../atoms/Label';
import MyButton from '../atoms/MyButton';
import {View, StyleSheet} from 'react-native';

interface Props {
  labelText: string;
  placeholder: string;
  btnText: string;
  value: string;
  autoComplete: string;
  onChangeText: Function;
  onClick: Function;
}

function CertificationForm({
  labelText,
  placeholder,
  btnText,
  value,
  onChangeText,
  autoComplete,
  onClick,
}: Props) {
  return (
    <View style={styles.inputWrapper}>
      <Label labelText={labelText} />
      <View style={styles.withBtn}>
        <View style={styles.inputWidth}>
          <TextLine
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            autoComplete={autoComplete}
            isPassword={false}
          />
        </View>
        <MyButton
          btnText={btnText}
          width={70}
          paddingVertical={10}
          fontWeight="normal"
          onClick={onClick}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  withBtn: {
    flexDirection: 'row',
  },
  inputWrapper: {
    padding: 20,
  },
  inputWidth: {
    flex: 1,
  },
});

export default CertificationForm;
