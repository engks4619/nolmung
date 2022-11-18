import React from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Squre from '~/atoms/Squre';
import OppentReview from '~/molecules/OppentReview';
import {reviewDataType} from '~/pages/Oppent';

interface Props {
  reviews: reviewDataType[];
}

const MARGINTOP = (Dimensions.get('window').height - 500) / 2;

function OppentReviews({reviews}: Props) {
  return (
    <View>
      {reviews?.length ? (
        <ScrollView>
          <View>
            {reviews.map((review, idx) => (
              <OppentReview
                key={idx}
                createdAt={review.createdAt}
                content={review.review}
                reviewer={review.reviewer}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <Squre
            imageSource="/images/review/empty.png"
            width={300}
            height={300}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginTop: MARGINTOP,
    alignItems: 'center',
  },
});

export default OppentReviews;
