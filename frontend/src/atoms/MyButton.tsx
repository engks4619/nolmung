import React from 'react';
import {StyleSheet, Pressable, Text, View} from 'react-native';
import {MAIN_COLOR} from '~/const';

interface Props {
  btnText: string;
  width: number;
  fontWeight: string;
  fontSize: number;
  onClick: Function;
}

function MyButton({
  btnText,
  width,
  fontWeight = '600',
  fontSize = 15,
  onClick,
}: Props) {
  return (
    <View style={styles.btnContainer}>
      <Pressable style={[styles.btn, {width}]} onPress={onClick}>
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
    paddingVertical: 20,
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
