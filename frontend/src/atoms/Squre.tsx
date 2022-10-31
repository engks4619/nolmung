import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface Props {
  imageSource: string;
}

function Squre({imageSource}: Props) {
  return (
    <View>
      <Image
        style={styles.imageContainer}
        source={{
          uri: imageSource,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 100,
    height: 100,
  },
});

export default Squre;
