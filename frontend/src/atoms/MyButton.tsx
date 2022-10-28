import React from 'react';
import {StyleSheet, Pressable, Text, View} from 'react-native';
import {MAIN_COLOR} from '~/const';

interface Props {
  btnText: string;
  width: number;
  paddingVertical: number;
  fontWeight: string;
  fontSize: number;
  onClick: Function;
}

function MyButton({
  btnText,
  width,
  paddingVertical = 20,
  fontWeight = '600',
  fontSize = 15,
  onClick,
}: Props) {
  return (
    <View style={styles.btnContainer}>
      <Pressable
        style={[styles.btn, {width, paddingVertical}]}
        onPress={onClick}>
        <Text
          style={[
            styles.fontStyle,
            {
              fontWeight,
              fontSize,
            },
          ]}>
          {btnText}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 10,
  },
  fontStyle: {
    color: 'white',
    textAlign: 'center',
  },
  btnContainer: {
    alignItems: 'center',
  },
});

export default MyButton;
