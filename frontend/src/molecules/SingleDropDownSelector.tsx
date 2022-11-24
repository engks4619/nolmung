import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Up from '@assets/up.svg';
import Down from '@assets/down.svg';
import {FONT_SIZE_S} from '~/const';

interface Props {
  data: string[];
  selectedItem: string;
  defaultText?: string;
  setData: Dispatch<SetStateAction<string>>;
}

const dropdownIcon = (isOpened: boolean) => {
  return isOpened ? (
    <Up width={10} height={10} fill={'rgb(129,129,129)'} />
  ) : (
    <Down width={10} height={10} fill={'rgb(129,129,129)'} />
  );
};

const SingleDropDownSelector = ({
  data,
  selectedItem,
  defaultText,
  setData,
}: Props) => {
  return (
    <SelectDropdown
      data={data}
      buttonStyle={styles.dropdownBtnStyle}
      buttonTextStyle={
        !selectedItem || selectedItem === ''
          ? styles.txtStyleNone
          : styles.txtStyle
      }
      renderDropdownIcon={isOpened => {
        return dropdownIcon(isOpened);
      }}
      defaultButtonText={defaultText ?? ' '}
      dropdownStyle={styles.dropDownStyle}
      rowStyle={styles.rowStyle}
      rowTextStyle={styles.rowTextStyle}
      onSelect={(selectedItem, idx) => {
        setData(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
    />
  );
};

const styles = StyleSheet.create({
  dropdownBtnStyle: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    height: 40,
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
});

export default SingleDropDownSelector;
