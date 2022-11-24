import React, {Dispatch, SetStateAction} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DogEtcOptionInfo from '~/molecules/DogEtcOptionInfo';
import {dogEtcOption} from '~/utils/type';

interface Props {
  DOG_ETC_OPTION: dogEtcOption[];
}

const DogEtcOptionContainer = ({DOG_ETC_OPTION}: Props) => {
  return (
    <View style={[styles.hContainer, styles.borderBottom]}>
      {DOG_ETC_OPTION.map((option, idx) => {
        return (
          <DogEtcOptionInfo
            leftText={option.leftText}
            data={option.data}
            setData={option.setData}
            key={idx}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  hContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
});

export default DogEtcOptionContainer;
