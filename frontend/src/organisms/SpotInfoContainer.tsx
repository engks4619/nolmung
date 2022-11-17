import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SpotAddressSummary from '~/organisms/SpotAddressSummary';
import SpotDetailInfoSummary from '~/organisms/SpotDetailInfoSummary';
import SpotInfoSummary from '~/organisms/SpotInfoSummary';
import {spot} from '~/utils/type';

interface Props {
  spot: spot | null;
  textAddress: string;
}

function SpotInfoContainer({spot, textAddress}: Props) {
  return (
    <View style={styles.container}>
      <SpotInfoSummary
        name={spot?.name ?? ''}
        reviewCnt={spot?.reviewCnt ?? 0}
        star={spot?.star ?? 0}
      />
      <SpotAddressSummary
        lat={spot?.lat ?? 0}
        lng={spot?.lng ?? 0}
        address={spot?.address ?? ''}
        textAddress={textAddress}
        name={spot?.name ?? ''}
      />
      <SpotDetailInfoSummary spot={spot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});

export default SpotInfoContainer;
