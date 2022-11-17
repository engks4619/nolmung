import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SpotAddressSummary from '~/molecules/SpotAddressSummary';
import SpotDetailInfoSummary from '~/molecules/SpotDetailInfoSummary';
import SpotInfoSummary from '~/molecules/SpotInfoSummary';
import {spot} from '~/utils/type';

interface Props {
  spot: spot | null;
}

function SpotInfoContainer({spot}: Props) {
  return (
    <View style={styles.container}>
      <SpotInfoSummary spot={spot} />
      <SpotAddressSummary spot={spot} />
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
