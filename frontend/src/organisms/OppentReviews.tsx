import React from 'react';
import {View} from 'react-native';
import OppentReview from '~/molecules/OppentReview';
import {reviewDataType} from '~/pages/Oppent';

interface Props {
  reviews: reviewDataType[];
}

function OppentReviews({reviews}: Props) {
  return (
    <View>
      {reviews.map(review => (
        <OppentReview
          createdAt={review.createdAt}
          content={review.review}
          reviewer={review.reviewer}
        />
      ))}
    </View>
  );
}

export default OppentReviews;
