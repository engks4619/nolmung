import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {spot} from '~/utils/type';
import Pencil from '@assets/pencil.svg';
import {BORDER_COLOR, FONT_SIZE_L, FONT_SIZE_M} from '~/const';

interface Props {
  spot: spot | null;
}

const getStringStar = (star: number): string => {
  if (!star) {
    return '0.0';
  }
  if (star.toString().length == 1) {
    return star.toString() + '.0';
  }
  return star.toString().slice(0, 3);
};

function SpotSummary({spot}: Props) {
  return (
    <View style={styles.hContainer}>
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {spot?.name}
        </Text>
        <Pencil
          width={10}
          height={10}
          fill="black"
          style={{paddingBottom: 15}}
        />
        <Text style={styles.text}>{spot?.reviewCnt}</Text>
      </View>
      <View>
        <Text style={styles.star}>{getStringStar(spot?.star ?? 0)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'space-between',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  titleContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: FONT_SIZE_M,
    color: 'black',
  },
  star: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SpotSummary;
