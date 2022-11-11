import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  setImageUploadModal: Dispatch<SetStateAction<boolean>>;
}

const ImageUploadModal = ({setImageUploadModal}: Props) => {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.bottomSheetContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  bottomSheetContainer: {
    height: '60%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    padding: 20,
  },
});
export default ImageUploadModal;
