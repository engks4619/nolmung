import React, {Dispatch} from 'react';
import {SetStateAction} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';

const renderDogList = (dog: {label: string; value: string}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.selectedTextStyle}>{dog.label}</Text>
    </View>
  );
};

interface Props {
  DOG_DATA: any[];
  selectedDog: any[];
  setSelectedDog: Dispatch<SetStateAction<any[]>>;
}

const DogSelectBox = ({DOG_DATA, selectedDog, setSelectedDog}: Props) => {
  return (
    <MultiSelect
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={DOG_DATA}
      labelField="label"
      valueField="value"
      placeholder="강아지 선택"
      value={selectedDog}
      search={false}
      searchPlaceholder="Search..."
      onChange={item => {
        setSelectedDog(item);
      }}
      renderItem={renderDogList}
      alwaysRenderItemSelected={true}
      selectedStyle={styles.selectedBoxStyle}
      renderSelectedItem={(item, unSelect) => (
        <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
          <View style={styles.selectedStyle}>
            <Text style={styles.textSelectedStyle}>{item.label}</Text>
            <Text>x</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginVertical: 5,
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    elevation: 4,
  },
  selectedTextStyle: {
    fontSize: 10,
  },
  dropdown: {
    width: '85%',
    alignSelf: 'center',
    height: 40,
    backgroundColor: 'white',
    paddingLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  placeholderStyle: {
    fontSize: 10,
    paddingLeft: 13,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedBoxStyle: {
    backgroundColor: 'yellow',
    width: '85%',
    alignSelf: 'center',
  },
});

export default DogSelectBox;
