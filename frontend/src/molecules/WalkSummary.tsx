import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  firstLabel: string;
  firstText: string;
  secondLabel: string;
  secondeText: string;
  thirdLabel: string;
  thridText: string;
}

function WalkSummary({
  firstLabel,
  firstText,
  secondLabel,
  secondeText,
  thirdLabel,
  thridText,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.infoContainer, styles.borderRight]}>
        <Text>{firstLabel}</Text>
        <Text style={styles.textCenter}>{firstText}회</Text>
      </View>
      <View style={[styles.infoContainer, styles.borderRight]}>
        <Text>{secondLabel}</Text>
        <Text style={styles.textCenter}>{secondeText}시간</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text>{thirdLabel}</Text>
        <Text style={styles.textCenter}>{thridText}km</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  borderRight: {
    borderRightWidth: 1,
  },
  infoContainer: {
    textAlign: 'center',
    padding: 10,
  },
  textCenter: {
    paddingTop: 7,
    textAlign: 'center',
  },
});

export default WalkSummary;
