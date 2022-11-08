import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import DetailDog from '@molecules/DetailDog';
import {DetailDogProps} from '@molecules/DetailDog';

// interface DetailDogsProps {
//   dogInfoList: DetailDogProps[];
// }

function DetailDogs() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <DetailDog />
        <DetailDog />
        <DetailDog />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    height: 100,
  },
});

export default DetailDogs;
