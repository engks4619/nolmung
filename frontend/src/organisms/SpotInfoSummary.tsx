import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Pencil from '@assets/pencil.svg';
import {BORDER_COLOR, FONT_SIZE_M} from '~/const';

interface Props {
  name: string;
  reviewCnt: number;
  star: number;
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

function SpotSummary({name, reviewCnt, star}: Props) {
  return (
    <View style={styles.hContainer}>
      <View style={styles.titleContainer}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {name}
        </Text>
        <View>
          <Pencil
            width={10}
            height={10}
            fill="black"
            style={[styles.pencil, styles.marginLeft]}
          />
        </View>
        <Text style={[styles.text, styles.marginLeft]}>{reviewCnt}</Text>
      </View>
      <View>
        <Text style={styles.star}>{getStringStar(star ?? 0)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
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
  marginLeft: {
    marginLeft: 5,
  },
  pencil: {
    paddingBottom: 18,
  },
  star: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SpotSummary;
