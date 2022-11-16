import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import OppentReview from '~/molecules/OppentReview';
import ReviewProfile from '~/molecules/ReviewProfile';

function OppentTemplate({
  isOwner,
  ownerReviews,
  ptReviews,
  oppentInfo,
  setIsOwner,
}) {
  return (
    <View style={styles.container}>
      <ReviewProfile
        isOwner={isOwner}
        ptReviewsNum={ptReviews.length}
        ownerReviews={ownerReviews.length}
        oppentInfo={oppentInfo}
        setIsOwner={setIsOwner}
      />
      <OppentReview />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default OppentTemplate;
