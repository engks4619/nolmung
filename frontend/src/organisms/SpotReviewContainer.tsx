import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Profile from '~/atoms/Profile';
import Squre from '~/atoms/Squre';
import {FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_S, MAIN_COLOR} from '~/const';
import SpotReviewInfo from '~/molecules/SpotReviewInfo';
import {review} from '~/utils/type';

interface Props {
  reviewList: review[] | null;
}

const renderEmpty = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Squre imageSource="/images/review/empty.png" />
    </View>
  );
};

const renderReview = (reviewList: review[]) => {
  return (
    <View>
      {reviewList.map((review, idx) => (
        <View key={idx}>
          <SpotReviewInfo review={review} />
        </View>
      ))}
    </View>
  );
};

function SpotReviewContainer({reviewList}: Props) {
  return (
    <View>
      <View style={styles.grayBox}>
        <Text style={styles.brown}>리뷰</Text>
      </View>
      <View style={styles.container}>
        {reviewList && reviewList?.length > 0
          ? renderReview(reviewList)
          : renderEmpty()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  hContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grayBox: {
    marginVertical: 10,
    backgroundColor: '#EEEEEE',
    paddingVertical: 5,
    alignItems: 'center',
  },
  brown: {
    color: MAIN_COLOR,
    fontSize: FONT_SIZE_S,
  },
});

export default SpotReviewContainer;
