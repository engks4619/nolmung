import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Profile from '@atoms/Profile';
import {MAIN_COLOR} from '~/const';

export interface DetailDogProps {
  dogName: string;
  breedCodeValue: string;
  image: string;
}

function DetailDog({dogName, breedCodeValue, image}: DetailDogProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imgCotainer}>
        <Profile imageSource={image} width={60} height={60} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textBold}>{dogName}</Text>
        <Text style={styles.textBold}>{breedCodeValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    borderWidth: 1.5,
    borderColor: MAIN_COLOR,
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  textContainer: {
    justifyContent: 'space-around',
    marginVertical: 10,
    marginLeft: 5,
    marginRight: 10,
  },
  textBold: {
    fontSize: 13,
    fontWeight: '800',
  },
  imgCotainer: {
    justifyContent: 'center',
  },
});

export default DetailDog;
