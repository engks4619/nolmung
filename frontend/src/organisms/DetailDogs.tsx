import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import DetailDog from '@molecules/DetailDog';
import {DetailDogProps} from '@molecules/DetailDog';

interface DetailDogsProps {
  dogInfoList: DetailDogProps[];
}

function DetailDogs({}: DetailDogsProps) {
  return (
    <ScrollView style={styles.container} horizontal>
      <DetailDog />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
});

export default DetailDogs;
