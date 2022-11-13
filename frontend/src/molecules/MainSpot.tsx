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
      ? '/images/spot/default/default.png'
      : `/images/spot/${item.spotId}/0.jpg`;

  const distance = item.distance.toString().split('.')[0];
  return (
    <View style={styles.spotContainer}>
      <Squre imageSource={convertImgaePath} width={90} height={90} />
      <Text style={styles.nameFont} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.distanceInfo}>{distance}km</Text>
        <Text style={styles.categoryContainer}>[{item.category}]</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  spotContainer: {
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  nameFont: {
    marginTop: 7,
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    width: 90,
  },
  distanceInfo: {
    fontSize: 12,
    marginRight: 6,
    color: MAIN_COLOR,
  },
  categoryContainer: {
    fontSize: 12,
  },
});

export default MainSpot;
