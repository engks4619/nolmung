import moment from 'moment';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import MyButton from '~/atoms/MyButton';
import {BORDER_COLOR, FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_S} from '~/const';
import breedData from 'utils/breedCode.json';
import Up from '@assets/up.svg';
import Down from '@assets/down.svg';
import Search from '@assets/search.svg';
import DatePicker from 'react-native-date-picker';
import {hangjungdong} from 'utils/hangjungdong';
import breedCode from 'utils/breedCode.json';

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  startDateModal: boolean;
  setStartDateModal: Dispatch<SetStateAction<boolean>>;
  endDateModal: boolean;
  setEndDateModal: Dispatch<SetStateAction<boolean>>;
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
  requestBody: any;
  setRequestBody: Dispatch<SetStateAction<any>>;
  startPay: number;
  setStartPay: Dispatch<SetStateAction<number>>;
  endPay: number;
  setEndPay: Dispatch<SetStateAction<number>>;
  selectedSido: string;
  setSelectedSido: Dispatch<SetStateAction<string>>;
  selectedSigugun: string;
  setSelectedSigugun: Dispatch<SetStateAction<string>>;
  selectedDong: string;
  setSelectedDong: Dispatch<SetStateAction<string>>;
  selectedBreed: number;
  setSelectedBreed: Dispatch<SetStateAction<number>>;
  searchWithPost: () => void;
}

const {width, height} = Dimensions.get('window');
const BREED_DATA = breedData.map((item, idx) => item.breed_code_value);

const dropdownIcon = (isOpened: boolean) => {
  return isOpened ? (
    <Up width={10} height={10} fill={'rgb(129,129,129)'} />
  ) : (
    <Down width={10} height={10} fill={'rgb(129,129,129)'} />
  );
};

const renderHcontainer = (leftText: string, right: any) => {
  return (
    <View style={[styles.hContainer, styles.inputContainer]}>
      <View style={styles.left}>
        <Text style={styles.text}>{leftText}</Text>
      </View>
      <View style={styles.right}>{right}</View>
    </View>
  );
};

const renderPlaceSelector = (
  data: string[],
  defaultButtonText: string,
  onSelect: Function,
) => {
  return (
    <SelectDropdown
      data={data}
      defaultButtonText={defaultButtonText}
      dropdownStyle={styles.dropDownStyle}
      buttonStyle={styles.dropdownPlaceBtnStyle}
      buttonTextStyle={styles.placeTxtStyle}
      rowStyle={styles.rowStyle}
      rowTextStyle={styles.placeTxtStyle}
      onSelect={selectedItem => onSelect(selectedItem)}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
    />
  );
};

const CommunityFilterModal = ({
  setModalOpen,
  startDateModal,
  setStartDateModal,
  endDateModal,
  setEndDateModal,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  requestBody,
  setRequestBody,
  startPay,
  setStartPay,
  endPay,
  setEndPay,
  selectedSido,
  setSelectedSido,
  selectedSigugun,
  setSelectedSigugun,
  selectedDong,
  setSelectedDong,
  selectedBreed,
  setSelectedBreed,
  searchWithPost,
}: Props) => {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [val3, setVal3] = useState('');
  const {sido, sigugun, dong} = hangjungdong;
  const [SIGUGUN_DATA, setSIGUGUN_DATA] = useState<string[]>([]);
  const [DONG_DATA, setDONG_DATA] = useState<string[]>([]);

  const SIDO_DATA = sido.map(item => item.codeNm);

  useEffect(() => {
    const data = sigugun.filter(item => item.sido === val1);
    setSIGUGUN_DATA(data.map(item => item.codeNm));
  }, [val1]);

  useEffect(() => {
    const data = dong.filter(item => item.sigugun === val2);
    setDONG_DATA(data.map(item => item.codeNm));
  }, [val2]);

  return (
    <TouchableOpacity
      onPressOut={() => setModalOpen(false)}
      activeOpacity={1}
      style={styles.modalOverlay}>
      <DatePicker
        modal
        mode={'date'}
        open={startDateModal}
        date={startDate}
        minimumDate={new Date()}
        locale="ko"
        onConfirm={date => {
          setStartDateModal(false);
          setStartDate(date);
        }}
        onCancel={() => {
          setStartDateModal(false);
        }}
        cancelText="취소"
        confirmText="확인"
        title=" "
      />
      <DatePicker
        modal
        mode={'date'}
        open={endDateModal}
        date={endDate}
        minimumDate={new Date()}
        locale="ko"
        onConfirm={date => {
          setEndDateModal(false);
          setEndDate(date);
        }}
        onCancel={() => {
          setEndDateModal(false);
        }}
        cancelText="취소"
        confirmText="확인"
        title=" "
      />
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback>
          <View style={styles.sheetContainer}>
            <ScrollView>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>검색 조건 설정</Text>
              </View>
              {renderHcontainer(
                '기간 :',
                <View style={styles.dateContainer}>
                  <Pressable onPress={() => setStartDateModal(true)}>
                    <View>
                      <Text style={styles.dateText}>
                        {moment(startDate ?? Date.now()).format('MM-DD dd')}
                      </Text>
                    </View>
                  </Pressable>
                  <Text style={styles.text}> ~ </Text>
                  <Pressable onPress={() => setEndDateModal(true)}>
                    <View>
                      <Text style={styles.dateText}>
                        {moment(endDate ?? moment().add(7, 'days')).format(
                          'MM-DD dd',
                        )}
                      </Text>
                    </View>
                  </Pressable>
                </View>,
              )}
              {renderHcontainer(
                '지역 :',
                <View style={styles.placeContainer}>
                  {renderPlaceSelector(
                    SIDO_DATA,
                    selectedSido !== '' ? selectedSido : '시/도',
                    (selectedItem: string) => {
                      setVal1(
                        sido.filter(item => item.codeNm === selectedItem)[0]
                          ?.sido,
                      );
                      setSelectedSido(selectedItem);
                    },
                  )}
                  {renderPlaceSelector(
                    SIGUGUN_DATA,
                    selectedSigugun !== '' ? selectedSigugun : '시/군/구',
                    (selectedItem: string) => {
                      setVal2(
                        sigugun.filter(item => item.codeNm === selectedItem)[0]
                          ?.sigugun,
                      );
                      setSelectedSigugun(selectedItem);
                    },
                  )}
                  {renderPlaceSelector(
                    DONG_DATA,
                    selectedDong !== '' ? selectedDong : '동',
                    (selectedItem: string) => {
                      setSelectedDong(selectedItem);
                    },
                  )}
                </View>,
              )}
              {renderHcontainer(
                '견종 :',
                <View>
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
                      defaultValue={selectedBreed ?? ' '}
                      defaultButtonText={' '}
                      dropdownStyle={styles.dropDownStyle}
                      rowStyle={styles.rowStyle}
                      rowTextStyle={styles.rowTextStyle}
                      onSelect={(selectedItem, idx) => {
                        setSelectedBreed(
                          breedCode.filter(
                            item => item.breed_code_value === selectedItem,
                          )[0].breed_code,
                        );
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                  </ScrollView>
                </View>,
              )}
              {renderHcontainer(
                '가격 :',
                <View style={[styles.hContainer, styles.payContainer]}>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      style={styles.text}
                      keyboardType={'numeric'}
                      onChangeText={text =>
                        setStartPay(parseInt(text.replace(/[^0-9]/g, '')))
                      }>
                      {startPay ? startPay.toLocaleString() : 0}
                    </TextInput>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={[styles.text, {textAlign: 'center'}]}>~</Text>
                  </View>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      style={styles.text}
                      keyboardType={'numeric'}
                      onChangeText={text =>
                        setEndPay(parseInt(text.replace(/[^0-9]/g, '')))
                      }>
                      {endPay ? endPay.toLocaleString() : 0}
                    </TextInput>
                  </View>
                </View>,
              )}
              <View style={styles.btnContainer}>
                <MyButton
                  btnText="적용하기"
                  onClick={() => {
                    searchWithPost();
                    setModalOpen(false);
                  }}
                  width={200}
                />
              </View>
            </ScrollView>
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
    height: '70%',
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
  inputContainer: {
    alignItems: 'center',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 5,
  },
  title: {
    fontSize: FONT_SIZE_L,
    color: 'black',
    fontWeight: 'bold',
  },
  hContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: FONT_SIZE_M,
    fontWeight: '400',
    color: 'black',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: FONT_SIZE_S,
    fontWeight: '400',
    color: 'black',
  },
  btnContainer: {
    marginTop: 25,
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
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 20,
  },
  dropdownPlaceBtnStyle: {
    backgroundColor: 'white',
    textAlign: 'left',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 5,
    height: 20,
    width: 100,
    marginBottom: 5,
  },
  placeTxtStyle: {
    color: 'black',
    fontSize: FONT_SIZE_S,
  },
  txtStyle: {
    color: 'black',
    fontSize: FONT_SIZE_M,
    marginRight: 20,
  },
  searchBox: {
    height: 40,
  },
  placeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  payContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 5,
    height: 40,
    flex: 2,
  },
});

export default CommunityFilterModal;
