import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import Profile from '~/atoms/Profile';
import Squre from '~/atoms/Squre';
import {BORDER_COLOR, FONT_SIZE_S} from '~/const';
import {review} from '~/utils/type';

interface Props {
  review: review;
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

function SpotReviewInfo({review}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.hContainer}>
        <View style={styles.hContainer}>
          <Profile imageSource={review.profileImage} width={30} height={30} />
          <Text style={styles.nickname}>{review.nickname}</Text>
        </View>
        <View>
          <Text style={styles.text}>{getStringStar(review.star)}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.text}>{review.content}</Text>
      </View>

      <FlatList
        data={review.photoList}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        renderItem={item => (
          <View style={styles.imgContainer}>
            <Squre
              imageSource={review.photoList[item.index]}
              width={300}
              height={200}
              borderRadius={3}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  hContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: FONT_SIZE_S,
  },
  nickname: {
    color: 'black',
    fontSize: FONT_SIZE_S,
    fontWeight: '500',
    marginLeft: 10,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  imgContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
});
export default SpotReviewInfo;
