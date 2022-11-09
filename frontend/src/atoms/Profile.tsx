import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

interface Props {
  width?: number;
  height?: number;
  imageSource: string;
}

function Profile({width = 70, height = 70, imageSource}: Props) {
  const convertImagePath = `http://www.nolmung.kr/api/image${imageSource}`;
  return (
    <View>
      <Image
        style={[styles.roundImage, {width, height}]}
        source={{uri: convertImagePath}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  roundImage: {
    borderRadius: 50,
  },
});

export default Profile;
