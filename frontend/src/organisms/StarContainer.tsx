import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';

interface Props {
  star: number;
  setStar: Dispatch<SetStateAction<number>>;
}

const STAR_IMAGE = require('@assets/star.png');

const StarContainer = ({star, setStar}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        <View>
          <Text style={styles.star}>{star} / 5 점</Text>
        </View>
        {/* <AirbnbRating
          defaultRating={5}
          showRating={false}
          // reviewColor={'rgb(241,196,15)'}
          onFinishRating={(rating: number) => setStar(rating)}
          starImage={STAR_IMAGE}
        /> */}
        <Rating
          type="custom"
          ratingCount={5}
          ratingImage={STAR_IMAGE}
          jumpValue={0.1}
          onSwipeRating={(rating: number) => setStar(rating)}
          fractions={5}
          startingValue={5}
          imageSize={40}
          ratingBackgroundColor="#c8c7c8"
          style={{marginHorizontal: 50}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  starContainer: {
    alignItems: 'center',
  },
  star: {
    fontSize: 16,
    fontWeight: '800',
    color: 'rgb(241,196,15)',
    paddingVertical: 5,
  },
});

export default StarContainer;
