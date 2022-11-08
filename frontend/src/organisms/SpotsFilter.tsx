import React, {Dispatch, SetStateAction, useRef} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import Reload from '@assets/reload.svg';
import SelectDropdown from 'react-native-select-dropdown';

interface Props {
  sort: number;
  setSort: Dispatch<SetStateAction<number>>;
  limitDistance: number;
  setLimitDistance: Dispatch<SetStateAction<number>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  initSpotRequest: () => void;
}

const sorts = ['거리순', '별점순', '리뷰많은순'];
const distances = ['1km', '10km', '30km', '제한없음'];
const distanceArr = [1000, 10000, 30000, 0];

function SpotsFilter({
  sort,
  setSort,
  limitDistance,
  setLimitDistance,
  category,
  setCategory,
  initSpotRequest,
}: Props) {
  const sortRef = useRef<SelectDropdown>(null);
  const categoryRef = useRef<SelectDropdown>(null);

  return (
    <View style={styles.container}>
      <View style={styles.hContainer}>
        <Pressable
          onPress={() => {
            initSpotRequest();
            sortRef.current?.reset();
            categoryRef.current?.reset();
            setCategory('카페');
          }}>
          <View style={styles.reloadBtn}>
            <Reload width={20} height={20} fill={'black'} stroke={'black'} />
            <Text style={[styles.text, styles.reloadText]}>초기화</Text>
          </View>
        </Pressable>
        <SelectDropdown
          ref={sortRef}
          buttonStyle={styles.borderBox}
          rowTextStyle={styles.borderText}
          data={sorts}
          selectedRowTextStyle={styles.brownText}
          buttonTextStyle={styles.borderText}
          defaultButtonText={sorts[0]}
          defaultValueByIndex={0}
          onSelect={(selectedItem, idx) => {
            setSort(idx);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
        <SelectDropdown
          ref={categoryRef}
          buttonStyle={styles.borderDistanceBox}
          rowTextStyle={styles.borderText}
          data={distances}
          selectedRowTextStyle={styles.brownText}
          buttonTextStyle={styles.borderText}
          defaultButtonText={distances[0]}
          defaultValueByIndex={0}
          onSelect={(selectedItem, idx) => {
            setLimitDistance(distanceArr[idx]);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
        <Pressable onPress={() => setCategory('카페')}>
          <Text
            style={
              category == '카페'
                ? [styles.text, styles.brownBorder]
                : styles.text
            }>
            카페
          </Text>
        </Pressable>
        <Pressable onPress={() => setCategory('식당')}>
          <Text
            style={
              category == '식당'
                ? [styles.text, styles.brownBorder]
                : styles.text
            }>
            식당
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  hContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    width: '95%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  reloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
  },
  reloadText: {
    marginLeft: 5,
  },
  borderBox: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'brown',
    borderWidth: 1,
    borderRadius: 15,
    width: 95,
    height: 30,
    alignItems: 'center',
  },
  borderDistanceBox: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'brown',
    borderWidth: 1,
    borderRadius: 15,
    width: 85,
    height: 30,
    alignItems: 'center',
  },
  borderText: {
    fontSize: 12,
  },
  brownText: {
    color: 'brown',
  },
  brownBorder: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'brown',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpotsFilter;
