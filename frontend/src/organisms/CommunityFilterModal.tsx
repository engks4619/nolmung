import React, {Dispatch, SetStateAction} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {FONT_SIZE_L} from '~/const';

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const {width, height} = Dimensions.get('window');

const CommunityFilterModal = ({setModalOpen}: Props) => {
  return (
    <TouchableOpacity
      onPressOut={() => setModalOpen(false)}
      activeOpacity={1}
      style={styles.modalOverlay}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback>
          <View style={styles.sheetContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>검색 조건 설정</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  sheetContainer: {
    height: '50%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: FONT_SIZE_L,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default CommunityFilterModal;
