import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FONT_SIZE_S} from '~/const';

interface Props {
  leftText: string;
  onPressFunc?: () => void;
  rightItem: JSX.Element;
}

const RegistArticleInputContainer = ({
  leftText,
  onPressFunc,
  rightItem,
}: Props) => {
  return (
    <View style={[styles.dateContainer, styles.borderBottom]}>
      <View style={{width: '30%'}}>
        <Text style={styles.text}>{leftText}</Text>
      </View>
      <Pressable
        onPress={onPressFunc ? () => onPressFunc() : null}
        style={{width: '70%', alignItems: 'center'}}>
        {rightItem}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  text: {
    fontSize: FONT_SIZE_S,
    paddingHorizontal: 15,
  },
});

export default RegistArticleInputContainer;
