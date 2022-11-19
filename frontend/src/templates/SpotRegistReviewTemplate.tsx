import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import React, {Dispatch, SetStateAction} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TextInputBox from '~/atoms/TextInputBox';
import {FONT_SIZE_M, FONT_SIZE_S, MAIN_COLOR} from '~/const';
import Camera from '@assets/camera.svg';

interface Props {
  spotId: string;
  spotName: string;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  star: number;
  setStar: Dispatch<SetStateAction<number>>;
  images: any[];
  setImages: Dispatch<SetStateAction<any[]>>;
}

const {width} = Dimensions.get('window');
const IMAGE_WIDTH = (width - 70) / 3;

const SpotRegistReviewTemplate = ({
  spotId,
  spotName,
  content,
  setContent,
  star,
  setStar,
  images,
  setImages,
}: Props) => {
  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        selectedAssets: images,
        isExportThumbnail: true,
        usedCameraButton: false,
        doneTitle: '완료',
        cancelTitle: '취소',
        maxSelectedAssets: 10,
      });
      setImages(response);
    } catch (e: any) {
      Alert.alert('이미지 업로드 실패!', e.code, e.message);
    }
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
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{spotName}</Text>
      </View>
      <TouchableOpacity
        onPress={openPicker}
        style={[styles.hContainer, styles.border]}>
        <View>
          <Camera
            width={20}
            height={20}
            fill={MAIN_COLOR}
            style={{marginRight: 10}}
          />
        </View>
        <View>
          <Text style={styles.brown}>사진 첨부하기</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        style={[
          {
            paddingTop: 6,
          },
        ]}
        data={images}
        keyExtractor={(item, index) => (item?.filename ?? item?.path) + index}
        renderItem={renderItem}
        numColumns={3}
        ListEmptyComponent={
          <View>
            <Text>선택된 사진이 없습니다.</Text>
          </View>
        }
      />
      <View style={styles.textBox}>
        <TextInputBox
          content={content}
          setContent={setContent}
          borderColor={'#A0A0A0'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
  },
  textBox: {
    marginVertical: 20,
    width: '100%',
  },
  border: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: MAIN_COLOR,
    borderRadius: 5,
    paddingVertical: 5,
  },
  hContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  brown: {
    color: MAIN_COLOR,
    fontWeight: '700',
    fontSize: FONT_SIZE_S,
  },
  media: {
    marginLeft: 6,
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    marginBottom: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
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

export default SpotRegistReviewTemplate;
