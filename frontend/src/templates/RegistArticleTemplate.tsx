import React, {Dispatch, SetStateAction} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {FONT_SIZE_S, MAIN_COLOR} from '~/const';
import Up from '@assets/up.svg';
import Down from '@assets/down.svg';
import 'moment/locale/ko';
import ImageAddBtn from '~/molecules/ImageAddBtn';
import PlaceModal from '~/organisms/PlaceModal';
import ImageUploadModal from '~/organisms/ImageUploadModal';
import DogSelectBox from '~/organisms/DogSelectBox';
import Loading from '~/atoms/Loading';
import SingleDropDownSelector from '~/molecules/SingleDropDownSelector';
import CustomDatePicker from '~/organisms/CustomDatePicker';
import BottomModal from '~/organisms/BottomModal';
import {dogEtcOption} from '~/utils/type';
import DogEtcOptionContainer from '~/organisms/DogEtcOptionSelectContainer';
import RegistArticleInputContainer from '~/organisms/RegistArticleInputContainer';

interface Props {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  subject: string;
  setSubject: Dispatch<SetStateAction<string>>;
  dog: string;
  setDog: Dispatch<SetStateAction<string>>;
  rope: boolean;
  setRope: Dispatch<SetStateAction<boolean>>;
  poop: boolean;
  setPoop: Dispatch<SetStateAction<boolean>>;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  dateModalOpen: boolean;
  setDateModalOpen: Dispatch<SetStateAction<boolean>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  placeModalOpen: boolean;
  setPlaceModalOpen: Dispatch<SetStateAction<boolean>>;
  imageModalOpen: boolean;
  setImageModalOpen: Dispatch<SetStateAction<boolean>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  price: number | null;
  setPrice: Dispatch<SetStateAction<number | null>>;
  images: any[];
  setImages: Dispatch<SetStateAction<any[]>>;
  selectedDog: any[];
  setSelectedDog: Dispatch<SetStateAction<any[]>>;
  DOG_DATA: {label: string; value: number}[] | null;
  CATEGORY_TYPES: string[];
  DOG_ETC_OPTION: dogEtcOption[];
  loading: boolean;
}

const RegistArticleTemplate = ({
  category,
  setCategory,
  subject,
  setSubject,
  dog,
  setDog,
  rope,
  setRope,
  poop,
  setPoop,
  date,
  setDate,
  dateModalOpen,
  setDateModalOpen,
  content,
  setContent,
  placeModalOpen,
  setPlaceModalOpen,
  imageModalOpen,
  setImageModalOpen,
  location,
  setLocation,
  price,
  setPrice,
  images,
  setImages,
  selectedDog,
  setSelectedDog,
  DOG_DATA,
  CATEGORY_TYPES,
  loading,
  DOG_ETC_OPTION,
}: Props) => {
  const moment = require('moment');

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <CustomDatePicker
            open={dateModalOpen}
            date={date}
            setDate={setDate}
            setModalOpen={setDateModalOpen}
          />
          <BottomModal
            visible={placeModalOpen}
            onRequestClose={() => setPlaceModalOpen(false)}
            renderItem={
              <PlaceModal
                setPlaceModal={setPlaceModalOpen}
                setLocation={setLocation}
              />
            }
          />
          <BottomModal
            visible={imageModalOpen}
            onRequestClose={() => setImageModalOpen(false)}
            renderItem={
              <ImageUploadModal
                setImageUploadModal={setImageModalOpen}
                images={images}
                setImages={setImages}
              />
            }
          />
          <ScrollView style={styles.optionContainer}>
            <SingleDropDownSelector
              data={CATEGORY_TYPES}
              selectedItem={category}
              defaultText={'카테고리 선택'}
              setData={setCategory}
            />
            <TextInput
              placeholder="제목을 입력해주세요"
              value={subject}
              onChangeText={text => setSubject(text)}
              style={[styles.textInput, styles.borderBottom]}
            />
            <DogSelectBox
              DOG_DATA={DOG_DATA}
              selectedDog={selectedDog}
              setSelectedDog={setSelectedDog}
            />
            <DogEtcOptionContainer DOG_ETC_OPTION={DOG_ETC_OPTION} />
            <RegistArticleInputContainer
              leftText="산책 날짜"
              onPressFunc={() => setDateModalOpen(true)}
              rightItem={
                <View>
                  <Text style={styles.text}>
                    {moment(date).format('YYYY-MM-DD ddd A hh:mm')}
                  </Text>
                </View>
              }
            />
            <RegistArticleInputContainer
              leftText="만남 장소"
              onPressFunc={() => setPlaceModalOpen(true)}
              rightItem={
                <View>
                  <Text style={styles.text}>
                    {location ? location : '동까지만 표시됩니다'}
                  </Text>
                </View>
              }
            />
            {category === '돌봐줘요' ? (
              <RegistArticleInputContainer
                leftText="가격 ￦"
                rightItem={
                  <TextInput
                    placeholder="선택 사항"
                    style={{
                      fontSize: 10,
                      paddingVertical: 0,
                    }}
                    keyboardType={'number-pad'}
                    value={price ? price.toLocaleString() : '0'}
                    onChangeText={text =>
                      setPrice(parseInt(text.replace(/[^0-9]/g, '')))
                    }
                  />
                }
              />
            ) : null}
            <View style={styles.contentContainer}>
              <TextInput
                multiline={true}
                numberOfLines={10}
                style={styles.content}
                placeholder={`내용을 입력해주세요.\n(내용 최소 10자 ~ 최대 200자 / 사진 최대 10장까지 가능)`}
                value={content}
                onChangeText={text => setContent(text)}
              />
            </View>
          </ScrollView>
          <ImageAddBtn onPress={() => setImageModalOpen(true)} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  optionContainer: {
    paddingHorizontal: 20,
  },
  dropdownBtnStyle: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    height: 40,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  txtStyleNone: {
    color: 'gray',
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: FONT_SIZE_S,
  },
  txtStyle: {
    color: 'black',
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: FONT_SIZE_S,
  },
  dropDownStyle: {
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
  },
  rowStyle: {
    backgroundColor: '#EFEFEF',
    height: 30,
  },
  rowTextStyle: {
    fontSize: FONT_SIZE_S,
  },
  textInput: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 25,
    fontSize: FONT_SIZE_S,
    paddingLeft: 25,
    height: 40,
  },
  hContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: FONT_SIZE_S,
    paddingHorizontal: 15,
  },
  borderBrown: {
    paddingVertical: 5,
    borderWidth: 1.3,
    borderColor: MAIN_COLOR,
    borderRadius: 12,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 2,
  },
  borderGray: {
    paddingVertical: 5,
    borderWidth: 1.3,
    borderColor: '#A0A0A0',
    borderRadius: 12,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 2,
  },
  black: {
    color: 'black',
  },
  dateContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  contentContainer: {
    display: 'flex',
    alignSelf: 'center',
    width: '100%',
    minHeight: 500,
  },
  content: {
    fontSize: FONT_SIZE_S,
  },
});

export default RegistArticleTemplate;
