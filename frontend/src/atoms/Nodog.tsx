import React from 'react';
import {Pressable} from 'react-native';
import NoDogSvg from '@assets/plusDog.svg';

interface Props {
  naviDogApply: () => void;
}

function Nodog({naviDogApply}: Props) {
  return (
    <Pressable onPress={() => naviDogApply()}>
      <NoDogSvg width={40} height={40} fill="black" />
    </Pressable>
  );
}

export default Nodog;
