import React, {Dispatch, SetStateAction} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {MAIN_COLOR} from '~/const';

const {width} = Dimensions.get('window');
const IMAGE_WIDTH = (width - 70) / 3;

interface Props {
  setImageUploadModal: Dispatch<SetStateAction<boolean>>;
  images: any[];
  setImages: Dispatch<SetStateAction<any[]>>;
}

const ImageUploadModal = ({setImageUploadModal, images, setImages}: Props) => {
  const openPicker = async () => {
    await MultipleImagePicker.openPicker({
      selectedAssets: images,
      isExportThumbnail: true,
      usedCameraButton: false,
      doneTitle: '완료',
      cancelTitle: '취소',
      maxSelectedAssets: 10,
    })
      .then(response => setImages(response))
      .catch(() => {});
  };

  const onDelete = (value: any) => {
    const data = images.filter(
      item =>
        item?.localIdentifier &&
        item?.localIdentifier !== value?.localIdentifier,
    );
    setImages(data);
  };

  const renderItem = ({item, index}: {item: any; index: any}) => {
    return (
      <View>
        <Image
          source={{
            uri: item?.path,
          }}
          style={styles.media}
        />
        <TouchableOpacity
          onPress={() => onDelete(item)}
          activeOpacity={0.9}
          style={styles.buttonDelete}>
          <Text style={styles.titleDelete}>x</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.bottomSheetContainer}>
        <SafeAreaView style={styles.container}>
          <FlatList
            style={[
              styles.container,
              {
                paddingTop: 6,
              },
            ]}
            data={images}
            keyExtractor={(item, index) =>
              (item?.filename ?? item?.path) + index
            }
            renderItem={renderItem}
            numColumns={3}
            ListEmptyComponent={
              <View>
                <Text>선택된 사진이 없습니다.</Text>
              </View>
            }
          />
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.openPicker} onPress={openPicker}>
              <Text style={styles.openText}>열기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.openPicker}
              onPress={() => setImageUploadModal(false)}>
              <Text style={styles.openText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
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
    height: '90%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 24,
  },
  media: {
    marginLeft: 6,
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    marginBottom: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
  },
  bottom: {
    flexDirection: 'row',
    padding: 24,
    justifyContent: 'space-between',
  },
  openText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    paddingVertical: 12,
  },
  openPicker: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MAIN_COLOR,
    borderRadius: 12,
  },
  buttonDelete: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ffffff92',
    borderRadius: 12,
  },
  titleDelete: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
  },
});
export default ImageUploadModal;
