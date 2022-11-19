import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Zoo from '@assets/zoo.svg';
import {MAIN_COLOR} from '~/const';

function DogLocation({hadleMyDogLocation}) {
  return (
    <Pressable style={styels.container} onPress={() => hadleMyDogLocation()}>
      <Zoo width={20} height={20} fill="black" />
      <Text style={styels.textStyle}>강아지 위치 보기</Text>
    </Pressable>
  );
}

const styels = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    flexDirection: 'row',
    borderColor: MAIN_COLOR,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 3,
  },
});

export default DogLocation;
