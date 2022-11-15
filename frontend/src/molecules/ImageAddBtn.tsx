import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Plus from '@assets/plus.svg';

interface Props {
  onPress: () => void;
}
const ImageAddBtn = ({onPress}: Props) => {
  return (
    <View style={styles.btnForm}>
      <Pressable onPress={onPress}>
        <Plus width={25} height={25} fill={'white'} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnForm: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: 'rgba(160,160,160,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    bottom: 40,
  },
});

export default ImageAddBtn;
