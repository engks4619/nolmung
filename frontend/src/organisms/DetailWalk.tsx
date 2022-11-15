import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {convertTime} from '@molecules/CommMainInfo';

const infoWidth = Dimensions.get('window').width * 0.97 * 0.25;

interface DetailWalkProps {
  location: string;
  walkDate: string;
}

function DetailWalk({location, walkDate}: DetailWalkProps) {
  let day = walkDate?.split('T')[0];
  let time = walkDate ? convertTime(walkDate.split('T')[1]) : null;

  return (
    <View style={styles.container}>
      <View style={[styles.infoContainer, styles.borderRight]}>
        <Text style={[styles.textCenter, styles.textBold]}>만남장소</Text>
        <Text style={styles.textCenter}>{location}</Text>
      </View>
      <View style={[styles.infoContainer]}>
        <Text style={[styles.textCenter, styles.textBold]}>산책 시간</Text>
        <Text style={styles.textCenter}>{day}</Text>
        <Text style={styles.textCenter}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 6,
    marginTop: 3,
    justifyContent: 'center',
  },
  infoContainer: {
    textAlign: 'center',
    width: infoWidth,
  },
  borderRight: {
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  textBold: {
    fontWeight: 'bold',
  },
  textCenter: {
    paddingTop: 5,
    fontSize: 13,
    textAlign: 'center',
  },
});

export default DetailWalk;
