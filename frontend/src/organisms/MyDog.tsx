import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {dogInfo} from '@pages/MyDogs';
import Profile from '@atoms/Profile';
interface Props {
  myDog: dogInfo | undefined;
}
function MyDog({myDog}: Props) {
  return (
    <View style={styles.myDogContainer}>
      {/* <Text>{myDog?.breedCodeValue}</Text>
      <Text>{myDog?.dogIdx}</Text>
      <Text>{myDog?.dogName}</Text>
      <Text>{myDog?.gender}</Text>
      <Text>{myDog?.image}</Text>
      <Text>{myDog?.neuter}</Text>
      <Text>{myDog?.vaccination}</Text> */}
      <View style={styles.profileContianer}>
        <Profile imageSource={myDog?.image}></Profile>
      </View>
      <View style={styles.descriptConainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  myDogContainer: {
    flexDirection: 'row',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.85,
    height: 100,
    margin: 10,
  },
  profileContianer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  descriptConainer: {flex: 2, backgroundColor: 'blue'},
});
export default MyDog;
