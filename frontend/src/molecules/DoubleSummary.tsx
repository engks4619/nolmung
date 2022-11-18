import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  firstLabel: string;
  firstText: number;
  secondLabel: string;
  secondText: number;
}

function DoubleSummary({
  firstLabel,
  firstText,
  secondLabel,
  secondText,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.infoContainer, styles.borderRight]}>
        <Text style={styles.fontSize}>{firstLabel}</Text>
        <Text style={[styles.textCenter, styles.fontSize]}>{firstText}</Text>
      </View>
      <View style={[styles.infoContainer, styles.borderRight]}>
        <Text style={styles.fontSize}>{secondLabel}</Text>
        <Text style={[styles.textCenter, styles.fontSize]}>{secondText}</Text>
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

export default DoubleSummary;
