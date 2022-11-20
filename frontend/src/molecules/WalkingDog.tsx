import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Profile from '~/atoms/Profile';

interface Props {
  dogName: string;
  dogImg: string;
}

function WalkingDog({dogName, dogImg}: Props) {
  return (
    <View style={styles.container}>
      <Profile imageSource={dogImg} width={45} height={45} />
      <Text style={styles.name}>{dogName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  name: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 13,
    color: 'black',
  },
});

export default WalkingDog;
