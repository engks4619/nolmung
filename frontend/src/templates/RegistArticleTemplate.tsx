import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {FONT_SIZE_S, MAIN_COLOR} from '~/const';
import Up from '@assets/up.svg';
import Down from '@assets/down.svg';
import DatePicker from 'react-native-date-picker';
import 'moment/locale/ko';
import ImageAddBtn from '~/molecules/ImageAddBtn';
import PlaceModal from '~/organisms/PlaceModal';
import ImageUploadModal from '~/organisms/ImageUploadModal';
import DogSelectBox from '~/organisms/DogSelectBox';

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
}

const dropdownIcon = (isOpened: boolean) => {
  return isOpened ? (
    <Up width={10} height={10} fill={'rgb(129,129,129)'} />
  ) : (
    <Down width={10} height={10} fill={'rgb(129,129,129)'} />
  );
};

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
}: Props) => {
  const moment = require('moment');
  moment.locale('kor');

  return (
    <View style={styles.container}>
      <DatePicker
        modal
        open={dateModalOpen}
        date={date}
        minimumDate={new Date()}
        locale="ko"
        onConfirm={date => {
          setDateModalOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setDateModalOpen(false);
        }}
        cancelText="취소"
        confirmText="확인"
        title=" "
      />
      <Modal
        visible={placeModalOpen}
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => {
          setPlaceModalOpen(false);
        }}>
        <PlaceModal
          setPlaceModal={setPlaceModalOpen}
          setLocation={setLocation}
        />
      </Modal>
      <Modal
        visible={imageModalOpen}
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => {
          setImageModalOpen(false);
        }}>
        <ImageUploadModal
          setImageUploadModal={setImageModalOpen}
          images={images}
          setImages={setImages}
        />
      </Modal>
      <ScrollView style={styles.optionContainer}>
        <SelectDropdown
          data={CATEGORY_TYPES}
          buttonStyle={styles.dropdownBtnStyle}
          buttonTextStyle={
            category === '' ? styles.txtStyleNone : styles.txtStyle
          }
          renderDropdownIcon={isOpened => {
            return dropdownIcon(isOpened);
          }}
          defaultButtonText={'카테고리 선택'}
          dropdownStyle={styles.dropDownStyle}
          rowStyle={styles.rowStyle}
          rowTextStyle={styles.rowTextStyle}
          onSelect={(selectedItem, idx) => {
            setCategory(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
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
        <View style={[styles.hContainer, styles.borderBottom]}>
          <Text style={[styles.text, styles.black]}>리드줄</Text>
          <View style={rope ? styles.borderBrown : styles.borderGray}>
            <Pressable onPress={() => setRope(true)}>
              <Text style={styles.text}>유</Text>
            </Pressable>
          </View>
          <View style={!rope ? styles.borderBrown : styles.borderGray}>
            <Pressable onPress={() => setRope(false)}>
              <Text style={styles.text}>무</Text>
            </Pressable>
          </View>
          <Text style={[styles.text, styles.black]}>배변봉투</Text>
          <View style={poop ? styles.borderBrown : styles.borderGray}>
            <Pressable onPress={() => setPoop(true)}>
              <Text style={styles.text}>유</Text>
            </Pressable>
          </View>
          <View style={!poop ? styles.borderBrown : styles.borderGray}>
            <Pressable onPress={() => setPoop(false)}>
              <Text style={styles.text}>무</Text>
            </Pressable>
          </View>
        </View>
        <View style={[styles.dateContainer, styles.borderBottom]}>
          <View style={{width: '30%'}}>
            <Text style={styles.text}>산책 날짜</Text>
          </View>
          <Pressable
            onPress={() => setDateModalOpen(true)}
            style={{width: '70%', alignItems: 'center'}}>
            <View>
              <Text style={styles.text}>
                {moment(date).format('YYYY-MM-DD ddd A hh:mm')}
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={[styles.dateContainer, styles.borderBottom]}>
          <View style={{width: '30%'}}>
            <Text style={styles.text}>만남 장소</Text>
          </View>
          <Pressable
            onPress={() => setPlaceModalOpen(true)}
            style={{width: '70%', alignItems: 'center'}}>
            <View>
              <Text style={styles.text}>
                {location ? location : '동까지만 표시됩니다'}
              </Text>
            </View>
          </Pressable>
        </View>
        {category === '돌봐줘요' ? (
          <View style={[styles.dateContainer, styles.borderBottom]}>
            <View style={{width: '30%'}}>
              <Text style={styles.text}> 가격 ￦</Text>
            </View>
            <View
              style={{
                width: '70%',
                alignItems: 'center',
                justifyContent: 'center',
                height: 12,
              }}>
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
            </View>
          </View>
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
