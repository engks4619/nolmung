import React, {useState} from 'react';
import {TouchableOpacity, View, StyleSheet, Image} from 'react-native';

const maxRating = [1, 2, 3, 4, 5];
const starImgFilled =
  'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
const starImgCorner =
  'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

interface Props {
  width: number;
  height: number;
}

function CustomRatingBar({width, height}: Props) {
  const [defaultRating, setDefaultRating] = useState<number>(0);

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
