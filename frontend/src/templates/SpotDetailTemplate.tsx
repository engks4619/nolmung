import React from 'react';
import {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SpotImgContainer from '~/organisms/SpotImgContainer';
import SpotInfoContainer from '~/organisms/SpotInfoContainer';
import SpotReviewContainer from '~/organisms/SpotReviewContainer';
import {review, spot} from '~/utils/type';

interface Props {
  spot: spot | null;
  reviewList: review[] | null;
  textAddress: string;
}

const SpotDetailTemplate = ({spot, reviewList, textAddress}: Props) => {
  return (
    <ScrollView style={styles.container} overScrollMode="never">
      <SpotImgContainer
        spotId={spot?.spotId ?? ''}
        imgCnt={spot?.imgCnt ?? 0}
      />
      <SpotInfoContainer spot={spot} textAddress={textAddress} />
      <SpotReviewContainer reviewList={reviewList} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default SpotDetailTemplate;
