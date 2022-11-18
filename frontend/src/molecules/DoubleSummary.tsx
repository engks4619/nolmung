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
  const h = Math.floor(firstText / 3600);
  const m = Math.floor((firstText % 3600) / 60);
  const s = Math.floor((firstText % 3600) % 60);

  const hDisplay = h > 0 ? h + (h === 1 ? ':' : ':') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ':' : ':') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? '0' : '') : '';
  const dist = Math.floor(secondText);
  return (
    <View style={styles.container}>
      <View style={[styles.infoContainer, styles.borderRight]}>
        <Text style={styles.fontSize}>{firstLabel}</Text>
        <Text
          style={[
            styles.textCenter,
            styles.fontSize,
          ]}>{`${hDisplay}${mDisplay}${sDisplay}`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.fontSize}>{secondLabel}</Text>
        <Text style={[styles.textCenter, styles.fontSize]}>{dist}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 5,
    justifyContent: 'center',
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
    fontSize: 13,
  },
});

export default DoubleSummary;
