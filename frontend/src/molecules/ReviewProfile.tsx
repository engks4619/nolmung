import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Profile from '~/atoms/Profile';
import {MAIN_COLOR} from '~/const';

function ReviewProfile({partTimeNum, useNum}) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Profile
          imageSource="/images/dog/tibet-terrier-g2059ea483_1920.jpg"
          width={50}
          height={50}
        />
        <Text style={styles.nameStyle}>빼뺴로</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoStyle}>알바횟수</Text>
        <Text style={styles.numberStyle}>{partTimeNum}</Text>
        <Text style={styles.infoStyle}>알바이용횟수</Text>
        <Text style={styles.numberStyle}>{useNum}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 15,
    paddingBottom: 15,
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0, 0, 0, .5)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  nameStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoStyle: {
    fontSize: 13,
    color: 'black',
  },
  numberStyle: {
    marginHorizontal: 5,
    color: MAIN_COLOR,
    fontWeight: '700',
  },
});

export default ReviewProfile;
