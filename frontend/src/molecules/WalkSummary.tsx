import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  firstLabel: string;
  firstText: number;
  secondLabel: string;
  secondeText: number;
  thirdLabel: string;
  thridText: number;
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
        <Text style={styles.fontSize}>{firstLabel}</Text>
        <Text style={[styles.textCenter, styles.fontSize]}>{firstText}회</Text>
      </View>
      <View style={[styles.infoContainer, styles.borderRight]}>
        <Text style={styles.fontSize}>{secondLabel}</Text>
        <Text style={[styles.textCenter, styles.fontSize]}>
          {secondeText}시간
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.fontSize}>{thirdLabel}</Text>
        <Text style={[styles.textCenter, styles.fontSize]}>{thridText}km</Text>
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
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  textCenter: {
    paddingTop: 7,
    textAlign: 'center',
  },
  fontSize: {
    fontSize: 12,
  },
});

export default WalkSummary;
