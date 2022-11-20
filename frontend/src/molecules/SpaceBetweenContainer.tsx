import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FONT_SIZE_S} from '~/const';

interface Props {
  left: string;
  right: string;
}

function SpaceBetweenContainer({left, right}: Props) {
  return (
    <View style={styles.itemHContainer}>
      <View style={styles.left}>
        <Text style={styles.text}>{left}</Text>
      </View>
      <View>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
          {right}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemHContainer: {
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: FONT_SIZE_S,
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 4,
  },
});

export default SpaceBetweenContainer;
