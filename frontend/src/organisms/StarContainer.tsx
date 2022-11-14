import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Rating} from 'react-native-ratings';

interface Props {
  star: number;
  setStar: Dispatch<SetStateAction<number>>;
}

const StarContainer = ({star, setStar}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        <View>
          <Text style={styles.star}>{star} / 5 점</Text>
        </View>
        <Rating
          ratingCount={5}
          jumpValue={0.5}
          onFinishRating={(rating: number) => setStar(rating)}
          fractions={5}
          startingValue={5}
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
