import React from 'react';
import {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SpotImgContainer from '~/organisms/SpotImgContainer';
import SpotInfoContainer from '~/organisms/SpotInfoContainer';
import {spot} from '~/utils/type';

interface Props {
  spot: spot | null;
}

const SpotDetailTemplate = ({spot}: Props) => {
  return (
    <ScrollView style={styles.container}>
      <SpotImgContainer
        spotId={spot?.spotId ?? ''}
        imgCnt={spot?.imgCnt ?? 0}
      />
      <SpotInfoContainer spot={spot} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default SpotDetailTemplate;
