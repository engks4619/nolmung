import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Squre from '../atoms/Squre';
import {MAIN_COLOR} from '../const';

interface Props {
  item: {
    id: number;
    name: string;
    imagePath: string;
    distance: number;
    category: string;
  };
}

function MainSpot({item}: Props) {
  return (
    <View style={styles.spotContainer}>
      <Squre imageSource={item.imagePath} />
      <Text style={styles.nameFont}>
        {item.name.length < 9 ? item.name : item.name.slice(0, 7) + '...'}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.distanceInfo}>{item.distance}km</Text>
        <Text>[{item.category}]</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  spotContainer: {
    paddingHorizontal: 10,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  nameFont: {
    fontSize: 14,
    fontWeight: '800',
  },
  distanceInfo: {
    color: MAIN_COLOR,
  },
});

export default MainSpot;
