import React, {Dispatch, SetStateAction} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FONT_SIZE_S, MAIN_COLOR} from '~/const';

interface Props {
  leftText: string;
  data: boolean;
  setData: Dispatch<SetStateAction<boolean>>;
}

const DogEtcOptionInfo = ({leftText, data, setData}: Props) => {
  return (
    <>
      <Text style={[styles.text, styles.black]}>{leftText}</Text>
      <View style={data ? styles.borderBrown : styles.borderGray}>
        <Pressable onPress={() => setData(true)}>
          <Text style={styles.text}>유</Text>
        </Pressable>
      </View>
      <View style={!data ? styles.borderBrown : styles.borderGray}>
        <Pressable onPress={() => setData(false)}>
          <Text style={styles.text}>무</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE_S,
    paddingHorizontal: 15,
  },
  black: {
    color: 'black',
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
});

export default DogEtcOptionInfo;
