import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Profile from '~/atoms/Profile';

function Review() {
  return (
    <View style={styles.container}>
      <Profile
        imageSource="/images/dog/tibet-terrier-g2059ea483_1920.jpg"
        width={50}
        height={50}
      />
      <Text style={styles.nameStyle}>뽀로로</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center',
  },
  nameStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
});

export default Review;
