import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Profile from '~/atoms/Profile';

function OppentReview() {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Profile
          imageSource="/images/dog/tibet-terrier-g2059ea483_1920.jpg"
          width={50}
          height={50}
        />
        <View>
          <Text style={styles.nameStyle}>뽀로로</Text>
          <Text style={styles.nameStyle}>11</Text>
        </View>
      </View>
      <Text>sss</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  nameStyle: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default OppentReview;
