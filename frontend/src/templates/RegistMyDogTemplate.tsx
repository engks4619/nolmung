import React, {Dispatch, SetStateAction} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Plus from '@assets/plus.svg';
import {FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_S, MAIN_COLOR} from '~/const';
import {dogRequestBody} from '~/utils/type';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import TextLine from '~/atoms/TextLine';
import breedData from 'utils/breedCode.json';
import SelectDropdown from 'react-native-select-dropdown';
import Up from '@assets/up.svg';
import Down from '@assets/down.svg';
import MyButton from '~/atoms/MyButton';
import Search from '@assets/search.svg';

const screenHeight = Dimensions.get('window').height;

interface Props {
  navigation: any;
  requestBody: dogRequestBody;
  setRequestBody: Dispatch<SetStateAction<dogRequestBody>>;
  image: any;
  setImage: Dispatch<SetStateAction<any>>;
  desc: string;
  setDesc: Dispatch<SetStateAction<string>>;
  registSubmit: () => void;
}

const BREED_DATA = breedData.map((item, idx) => item.breed_code_value);

const dropdownIcon = (isOpened: boolean) => {
  return isOpened ? (
    <Up width={10} height={10} fill={'rgb(129,129,129)'} />
  ) : (
    <Down width={10} height={10} fill={'rgb(129,129,129)'} />
  );
};

const RegistMyDogTemplate = ({
  navigation,
  requestBody,
  setRequestBody,
  image,
  setImage,
  desc,
  setDesc,
  registSubmit,
}: Props) => {
  const openPicker = async () => {
    await MultipleImagePicker.openPicker({
      isExportThumbnail: true,
      usedCameraButton: true,
      doneTitle: '완료',
      cancelTitle: '취소',
      singleSelectedMode: true,
      mediaType: 'image',
    })
      .then(response => setImage(response))
      .catch(() => {});
  };

  const renderTextInput = (
    label: string,
    onChangeText: (val: string) => void,
    value: string,
  ) => {
    return (
      <TextLine
        placeholder=""
        onChangeText={onChangeText}
        value={value}
        isPassword={false}
      />
    );
  };

  const renderChooseBox = (
    leftText: string,
    rightText: string,
    left: boolean,
    right: boolean,
    pressFunc: (idx: number) => void,
  ) => {
    return (
      <View style={styles.hContainer}>
        <TouchableOpacity onPress={() => pressFunc(0)}>
          <View style={left ? styles.borderBrown : styles.border}>
            <Text style={left ? styles.brownText : styles.grayText}>
              {leftText}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressFunc(1)} style={{marginLeft: 10}}>
          <View style={right ? styles.borderBrown : styles.border}>
            <Text style={right ? styles.brownText : styles.grayText}>
              {rightText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderLabel = (text: string) => {
    return (
      <View style={styles.textInput}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

  const chooseGender = (idx: number) => {
    idx === 0
      ? setRequestBody({...requestBody, gender: 'M'})
      : setRequestBody({...requestBody, gender: 'F'});
  };

  const chooseNeuter = (idx: number) => {
    idx === 0
      ? setRequestBody({...requestBody, neuter: false})
      : setRequestBody({...requestBody, neuter: true});
  };

  const chooseVaccination = (idx: number) => {
    idx === 0
      ? setRequestBody({...requestBody, vaccination: false})
      : setRequestBody({...requestBody, vaccination: true});
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title]}>강아지 등록</Text>
        </View>
        <View style={styles.imgAddBtnContainer}>
          <TouchableOpacity onPress={openPicker}>
            {!image ? (
              <>
                <View style={styles.imgAddBtn}>
                  <Plus width={30} height={30} fill={'white'} />
                </View>
              </>
            ) : (
              <View style={styles.imgAddBtn}>
                <Image
                  style={styles.profileImage}
                  source={{uri: image?.path}}
                />
              </View>
            )}
            <Text>프로필 사진 등록</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          {renderLabel('강아지 이름')}
          {renderTextInput(
            '강아지 이름',
            (val: string) => setRequestBody({...requestBody, dogName: val}),
            requestBody.dogName,
          )}
          {renderLabel('견종 선택')}
          <ScrollView>
            <SelectDropdown
              data={BREED_DATA}
              buttonStyle={styles.dropdownBtnStyle}
              buttonTextStyle={styles.txtStyle}
              renderDropdownIcon={isOpened => {
                return dropdownIcon(isOpened);
              }}
              search={true}
              searchInputStyle={styles.searchBox}
              renderSearchInputRightIcon={() => {
                return <Search width={15} height={15} fill="black" />;
              }}
              defaultButtonText={' '}
              dropdownStyle={styles.dropDownStyle}
              rowStyle={styles.rowStyle}
              rowTextStyle={styles.rowTextStyle}
              onSelect={(selectedItem, idx) => {
                setRequestBody({...requestBody, breedCode: idx});
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </ScrollView>
          {renderLabel('성별')}
          {renderChooseBox(
            '남아',
            '여아',
            requestBody.gender === 'M',
            requestBody.gender === 'F',
            chooseGender,
          )}
          {renderLabel('중성화 여부')}
          {renderChooseBox(
            '중성화 전',
            '중성화 완료',
            requestBody.neuter === false,
            requestBody.neuter === true,
            chooseNeuter,
          )}
          {renderLabel('예방접종 여부')}
          {renderChooseBox(
            '아니오',
            '예',
            requestBody.vaccination === false,
            requestBody.vaccination === true,
            chooseVaccination,
          )}
          {renderLabel('소개/특이사항')}
          <View style={styles.textInputContainer}>
            <TextInput
              multiline={true}
              numberOfLines={8}
              style={styles.textInputBox}
              value={desc}
              onChangeText={(text: string) => setDesc(text)}
            />
          </View>
          <View style={styles.btnContainer}>
            <MyButton
              btnText="작성 완료"
              width={250}
              onClick={() => registSubmit()}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  title: {
    textAlign: 'left',
    fontSize: FONT_SIZE_L,
    fontWeight: 'bold',
    color: 'black',
  },
  imgAddBtnContainer: {
    paddingVertical: 20,
  },
  imgAddBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(160,160,160,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: FONT_SIZE_S,
    color: 'black',
    fontWeight: 'bold',
  },
  inputContainer: {
    alignSelf: 'flex-start',
    width: '100%',
  },
  searchBox: {
    height: 40,
  },
  textInput: {
    paddingVertical: 5,
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
    fontSize: FONT_SIZE_M,
  },
  dropdownBtnStyle: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: 40,
  },
  txtStyleNone: {
    color: 'gray',
    textAlign: 'left',
    fontSize: FONT_SIZE_M,
  },
  txtStyle: {
    color: 'black',
    textAlign: 'left',
    fontSize: FONT_SIZE_M,
  },
  profileImage: {
    borderRadius: 100,
    width: 115,
    height: 115,
  },
  hContainer: {
    flexDirection: 'row',
  },
  borderBrown: {
    width: 90,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: MAIN_COLOR,
    borderRadius: 13,
    paddingVertical: 5,
  },
  border: {
    width: 90,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 13,
    paddingVertical: 5,
  },
  brownText: {
    fontSize: FONT_SIZE_S,
    color: MAIN_COLOR,
  },
  grayText: {
    fontSize: FONT_SIZE_S,
    color: '#A9A9A9',
  },
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    height: 150,
    borderColor: 'gray',
  },
  textInputBox: {
    paddingHorizontal: 20,
  },
  btnContainer: {
    paddingVertical: 15,
  },
});

export default RegistMyDogTemplate;
