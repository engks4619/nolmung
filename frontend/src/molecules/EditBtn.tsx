import React from 'react';
import {View, StyleSheet} from 'react-native';
import Edit from '@assets/edit.svg';
import {MAIN_COLOR} from '~/const';

function EditBtn() {
  return (
    <View style={styles.editForm}>
      <Edit width={40} height={40} fill="black" />
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
    bottom: 150,
  },
});

export default EditBtn;
