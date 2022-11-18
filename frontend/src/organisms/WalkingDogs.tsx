import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {DetailDogProps} from '~/molecules/DetailDog';
import WalkingDog from '~/molecules/WalkingDog';

interface Props {
  dogInfoList: DetailDogProps[];
  text: string;
}

function WalkingDogs({dogInfoList, text}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{text}</Text>
      <ScrollView horizontal style={styles.dogsContainer}>
        {dogInfoList.map(dogInfo => (
          <WalkingDog dogName={dogInfo.dogName} dogImg={dogInfo.image} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  dogsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  heading: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default WalkingDogs;
