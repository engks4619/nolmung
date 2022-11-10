import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Home from '@assets/home.svg';
import Paw from '@assets/paw.svg';
import {MAIN_COLOR} from '~/const';

const categroyTypes = ['함께가요', '돌봐줘요'];
const defaultCategoryMsg = '카테고리 선택';
const dogList = ['뽀삐', '초코'];
const defaultDogMsg = '강아지 선택';

const dropdownIcon = (isOpened: boolean) => {
  return isOpened ? (
    <Home width={20} height={20} fill={'black'} />
  ) : (
    <Paw width={20} height={20} fill={'black'} />
  );
};

const RegistArticle = () => {
  const [category, setCategory] = useState<string>('');
  const [dog, setDog] = useState<string>('');
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.hContainer}>
          <Text style={styles.title}>게시글 작성</Text>
          <View style={styles.registBtn}>
            <Pressable>
              <Text style={styles.brown}>등록</Text>
            </Pressable>
          </View>
        </View>
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
        <TextInput placeholder="제목을 입력해주세요" style={styles.textInput} />
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  hContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: 'black',
    paddingVertical: 5,
  },
  registBtn: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  brown: {
    fontSize: 10,
    color: MAIN_COLOR,
    fontWeight: '700',
  },

  dropdownBtnStyle: {
    width: '100%',
    backgroundColor: 'yellow',
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
    fontSize: 12,
  },
  dropDownStyle: {
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
  },
  rowStyle: {
    backgroundColor: '#EFEFEF',
  },
  rowTextStyle: {
    fontSize: 10,
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 25,
    fontSize: 10,
  },
});

export default RegistArticle;
