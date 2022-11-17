import React from 'react';
import {View, StyleSheet} from 'react-native';
import ReviewProfile from '~/molecules/ReviewProfile';
import OppentReviews from '~/organisms/OppentReviews';
import {reviewDataType, reviewerType} from '~/pages/Oppent';

interface Props {
  isOwner: boolean;
  ownerReviews: reviewDataType[];
  ptReviews: reviewDataType[];
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>;
}

function OppentTemplate({isOwner, ownerReviews, ptReviews, setIsOwner}: Props) {
  return (
    <View style={styles.container}>
      <ReviewProfile
        isOwner={isOwner}
        ptReviewsNum={ptReviews.length}
        ownerReviews={ownerReviews.length}
        setIsOwner={setIsOwner}
      />
      <OppentReviews reviews={isOwner ? ownerReviews : ptReviews} />
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
