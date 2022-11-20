import React, {Dispatch, SetStateAction, useState} from 'react';
import {TouchableOpacity, View, StyleSheet, Image} from 'react-native';

const maxRating = [1, 2, 3, 4, 5];
const starImgFilled =
  'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
const starImgCorner =
  'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

interface Props {
  width: number;
  height: number;
  defaultRating: number;
  setDefaultRating: Dispatch<SetStateAction<number>>;
}

function CustomRatingBar({
  width,
  height,
  defaultRating,
  setDefaultRating,
}: Props) {
  return (
    <View style={styles.customRatingBarStyle}>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => setDefaultRating(item)}>
            <Image
              style={[styles.starImgStyle, {width, height}]}
              source={
                item <= defaultRating
                  ? {uri: starImgFilled}
                  : {uri: starImgCorner}
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  customRatingBarStyle: {
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  starImgStyle: {
    resizeMode: 'cover',
    marginHorizontal: 3,
  },
});

export default CustomRatingBar;
