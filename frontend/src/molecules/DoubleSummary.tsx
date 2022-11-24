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

  const hDisplay = h > 0 ? (h < 10 ? '0' : '') + h : '00';
  const mDisplay = m > 0 ? (m < 10 ? '0' : '') + m : '00';
  const sDisplay = s > 0 ? (s < 10 ? '0' : '') + s : '00';
  const dist = Math.floor(secondText);
  return (
    <View style={styles.container}>
      <View style={[styles.infoContainer, styles.borderRight]}>
        <Text style={styles.fontSize}>{firstLabel}</Text>
        <Text
          style={[
            styles.textCenter,
            styles.fontSize,
          ]}>{`${hDisplay}:${mDisplay}:${sDisplay}`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.fontSize}>{secondLabel}</Text>
        <Text style={[styles.textCenter, styles.fontSize]}>{`${dist} m`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'center',
  },
  borderRight: {
    borderRightWidth: 1,
  },
  infoContainer: {
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 50,
  },
  textCenter: {
    paddingTop: 7,
    textAlign: 'center',
    color: 'black',
  },
  fontSize: {
    fontSize: 13,
    color: 'black',
  },
});

export default DoubleSummary;
