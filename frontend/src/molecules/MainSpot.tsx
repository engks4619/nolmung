import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Squre from '@atoms/Squre';
import {MAIN_COLOR} from '~/const';

interface Props {
  item: {
    spotId: number;
    name: string;
    imgCnt: number;
    distance: number;
    category: string;
  };
}

function MainSpot({item}: Props) {
  const convertImgaePath =
    item.imgCnt === 0
      ? 'default image'
      : `http://nolmung.kr/api/images/spot/${item.spotId}/0.jpg`;

  const distance = item.distance.toString().split('.')[0];
  return (
    <View style={styles.spotContainer}>
      <Squre imageSource={convertImgaePath} />
      <Text style={styles.nameFont} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.distanceInfo}>{distance}km</Text>
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
    width: 100,
  },
  distanceInfo: {
    paddingRight: 3,
    color: MAIN_COLOR,
  },
});

export default MainSpot;
