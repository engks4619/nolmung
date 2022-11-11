import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {MAIN_COLOR} from '~/const';
import Up from '@assets/up.svg';
import Down from '@assets/down.svg';
import DatePicker from 'react-native-date-picker';
import * as moment from 'moment';
import 'moment/locale/ko';
import ImageAddBtn from '~/molecules/ImageAddBtn';
import PlaceModal from '~/organisms/PlaceModal';

interface Props {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
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
}

const dropdownIcon = (isOpened: boolean) => {
  return isOpened ? (
    <Up width={12} height={12} fill={'#A0A0A0'} />
  ) : (
    <Down width={12} height={12} fill={'#A0A0A0'} />
  );
};

const categroyTypes = ['함께가요', '돌봐줘요'];
const defaultCategoryMsg = '카테고리 선택';
const dogList = ['뽀삐', '초코'];
const defaultDogMsg = '강아지 선택';

const RegistArticleTemplate = ({
  category,
  setCategory,
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
        <PlaceModal setPlaceModal={setPlaceModalOpen} />
      </Modal>
      <ScrollView>
        <SelectDropdown
          data={categroyTypes}
          buttonStyle={styles.dropdownBtnStyle}
          buttonTextStyle={
            category === '' ? styles.txtStyleNone : styles.txtStyle
          }
          renderDropdownIcon={isOpened => {
            return dropdownIcon(isOpened);
          }}
          defaultButtonText={defaultCategoryMsg}
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
          style={[styles.textInput, styles.borderBottom]}
        />
        <SelectDropdown
          data={dogList}
          buttonStyle={styles.dropdownBtnStyle}
          buttonTextStyle={dog === '' ? styles.txtStyleNone : styles.txtStyle}
          renderDropdownIcon={isOpened => {
            return dropdownIcon(isOpened);
          }}
          defaultButtonText={defaultDogMsg}
          dropdownStyle={styles.dropDownStyle}
          rowStyle={styles.rowStyle}
          rowTextStyle={styles.rowTextStyle}
          onSelect={(selectedItem, idx) => {
            setDog(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
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
          <View style={{width: '25%'}}>
            <Text style={styles.text}>산책 날짜</Text>
          </View>
          <Pressable
            onPress={() => setDateModalOpen(true)}
            style={{width: '75%', alignItems: 'center'}}>
            <View>
              <Text style={styles.text}>
                {moment(date).format('YYYY-MM-DD ddd A hh:mm')}
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={[styles.dateContainer, styles.borderBottom]}>
          <View style={{width: '25%'}}>
            <Text style={styles.text}>만남 장소</Text>
          </View>
          <Pressable
            onPress={() => setPlaceModalOpen(true)}
            style={{width: '75%', alignItems: 'center'}}>
            <View>
              <Text style={styles.text}>동까지만 표시됩니다</Text>
            </View>
          </Pressable>
        </View>
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
  dropdownBtnStyle: {
    width: '85%',
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
    fontSize: 10,
  },
  txtStyle: {
    color: 'black',
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: 10,
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
    fontSize: 10,
  },
  textInput: {
    width: '85%',
    alignSelf: 'center',
    paddingHorizontal: 25,
    fontSize: 10,
    paddingLeft: 25,
    height: 40,
  },
  hContainer: {
    width: '85%',
    flexDirection: 'row',
    paddingVertical: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
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
    width: '85%',
    paddingVertical: 10,
  },
  contentContainer: {
    alignSelf: 'center',
    width: '85%',
    minHeight: 300,
  },
  content: {
    fontSize: 10,
  },
});

export default RegistArticleTemplate;
