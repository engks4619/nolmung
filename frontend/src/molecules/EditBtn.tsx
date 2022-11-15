import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Edit from '@assets/edit.svg';
import {MAIN_COLOR} from '~/const';

interface Props {
  onPress: () => void;
}
function EditBtn({onPress}: Props) {
  return (
    <View style={styles.editForm}>
      <Pressable onPress={onPress}>
        <Edit width={40} height={40} fill="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  editForm: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: MAIN_COLOR,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 100,
  },
});

export default EditBtn;
