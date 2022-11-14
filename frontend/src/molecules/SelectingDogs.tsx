import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import Profile from '~/atoms/Profile';
import {MAIN_COLOR} from '~/const';
import {dogInfo} from './MainDogs';

interface Props {
  myDogs: dogInfo[] | undefined;
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectingDogs({myDogs, setIsSelecting}: Props) {
  return (
    <View style={styles.container}>
      {myDogs?.map((dog: dogInfo) => (
        <Pressable style={styles.profileContainer}>
          <Profile
            key={dog.dogIdx}
            imageSource={dog.image}
            width={35}
            height={35}
          />
        </Pressable>
      ))}
      <Pressable onPress={() => setIsSelecting(false)}>
        <View style={styles.doneContainer}>
          <Text style={styles.doneText}>완료</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(188, 94, 0, 0.5)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  profileContainer: {
    marginHorizontal: 2,
  },
  doneContainer: {
    width: 35,
    height: 35,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  doneText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: MAIN_COLOR,
  },
  // selectedDogs: {
  // },
});

export default SelectingDogs;
