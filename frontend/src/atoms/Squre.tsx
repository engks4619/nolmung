import React from 'react';
import {View, Image} from 'react-native';

interface Props {
  imageSource: string;
  width?: number;
  height?: number;
}

function Squre({imageSource, width = 100, height = 100}: Props) {
  return (
    <View>
      <Image
        style={{
          width,
          height,
        }}
        source={{
          uri: imageSource,
        }}
      />
    </View>
  );
}

export default Squre;
