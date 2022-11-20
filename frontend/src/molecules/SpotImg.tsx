import React from 'react';
import {StyleSheet, View} from 'react-native';
import Squre from '~/atoms/Squre';

interface Props {
  item: string;
}

function SpotImg({item}: Props) {
  return (
    <View>
      <Squre imageSource={item} width={120} height={120} />
    </View>
  );
}

export default SpotImg;
