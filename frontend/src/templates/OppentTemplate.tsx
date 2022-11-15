import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Review from '~/molecules/Review';
import ReviewProfile from '~/molecules/ReviewProfile';

function OppentTemplate({partTimeNum, useNum}) {
  return (
    <View style={styles.container}>
      <ReviewProfile partTimeNum={partTimeNum} useNum={useNum} />
      <Review />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default OppentTemplate;
