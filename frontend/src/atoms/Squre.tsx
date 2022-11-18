import React from 'react';
import {View, Image} from 'react-native';

interface Props {
  imageSource: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
}

function Squre({
  imageSource,
  width = 100,
  height = 100,
  borderRadius = 0,
}: Props) {
  const convertImagePath = `http://www.nolmung.kr/api/image${imageSource}`;
  return (
    <View>
      <Image
        style={{
          width,
          height,
          borderRadius,
        }}
        source={{
          uri: convertImagePath,
        }}
      />
    </View>
  );
}

export default Squre;
