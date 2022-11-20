import React, {useState} from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';

const maxRating = [1, 2, 3, 4, 5];
const starImgFilled =
  'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
const starImgCorner =
  'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

interface Props {
  starRate: number;
  width?: number;
  height?: number;
}

function StaticRating({starRate, width = 13, height = 13}: Props) {
  return (
    <View style={styles.customRatingBarStyle}>
      {maxRating.map((item, key) => {
        return (
          <Pressable key={item}>
            <Image
              style={[styles.starImgStyle, {width, height}]}
              source={
                item <= starRate ? {uri: starImgFilled} : {uri: starImgCorner}
              }
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  customRatingBarStyle: {
    // marginTop: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    marginHorizontal: 3,
  },
});

export default StaticRating;
