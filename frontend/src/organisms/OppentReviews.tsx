import React from 'react';
import {View, Text} from 'react-native';
import OppentReview from '~/molecules/OppentReview';
import {reviewDataType} from '~/pages/Oppent';

interface Props {
  reviews: reviewDataType[];
}

function OppentReviews({reviews}: Props) {
  console.log(reviews.length);
  return (
    <View>
      {reviews?.length ? (
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
      ) : (
        <View>
          <Text>리뷰가 존재하지 않습니다.</Text>
        </View>
      )}
    </View>
  );
}

export default OppentReviews;
