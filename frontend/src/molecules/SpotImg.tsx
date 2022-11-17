import React from 'react';
import {StyleSheet, View} from 'react-native';
import Squre from '~/atoms/Squre';

interface Props {
  item: string;
}

function SpotImg({item}: Props) {
  return (
    <View style={styles.spotContainer}>
      <Squre imageSource={item} width={120} height={120} />
    </View>
  );
}

const styles = StyleSheet.create({
  spotContainer: {
    marginBottom: 10,
  },
});

export default SpotImg;
