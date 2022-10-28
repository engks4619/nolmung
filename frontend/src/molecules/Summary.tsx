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

function Summary({
  firstLabel,
  firstText,
  secondLabel,
  secondeText,
  thirdLabel,
  thridText,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>산책 횟수</Text>
        <Text style={styles.textCenter}>13회</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text>총 산책 시간</Text>
        <Text style={styles.textCenter}>500시간</Text>
      </View>
      <View>
        <Text>총 산책 거리</Text>
        <Text style={styles.textCenter}>500Km</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  infoContainer: {
    textAlign: 'center',
    borderRightWidth: 1,
    padding: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default Summary;
