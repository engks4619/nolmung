import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FONT_SIZE_S} from '~/const';

interface Props {
  left: string;
  right: any;
}

function HContainer({left, right}: Props) {
  return (
    <View style={styles.hContainer}>
      <View style={styles.left}>
        <Text style={styles.text}>{left}</Text>
      </View>
      <View style={styles.right}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: FONT_SIZE_S,
  },
  hContainer: {
    marginVertical: 3,
    flexDirection: 'row',
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 4,
  },
});

export default HContainer;
