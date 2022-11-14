import React, {Dispatch} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import Profile from '~/atoms/Profile';
import {RootState} from '~/store/reducer';
import SelectingDogs from '@molecules/SelectingDogs';

export interface dogInfo {
  breedCodeValue: string;
  dogIdx: number;
  dogName: string;
  image: string;
}

interface Props {
  isSelecting: boolean;
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>;
}

function MainDogs({isSelecting, setIsSelecting}: Props) {
  const myDogs: dogInfo[] | undefined = useSelector(
    (state: RootState) => state.dogs.dogsInfo,
  );

  if (myDogs.length === 0) {
    return <Text>추가해주세욤</Text>;
  } else if (myDogs.length === 1) {
    return <Profile imageSource={myDogs[0].image} width={50} height={50} />;
  } else {
    return (
      <Pressable onPress={() => setIsSelecting(true)}>
        <View
          style={isSelecting ? styles.selectingContainer : styles.container}>
          <View style={isSelecting ? styles.isSelectingStyle : null}>
            <Profile imageSource={myDogs[0].image} width={70} height={70} />
          </View>
          <View style={styles.number}>
            {isSelecting ? (
              <SelectingDogs myDogs={myDogs} setIsSelecting={setIsSelecting} />
            ) : (
              <Text style={styles.textContainer}>+{myDogs?.length - 1}</Text>
            )}
          </View>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 25,
  },
  selectingContainer: {
    paddingRight: 55,
  },
  isSelectingStyle: {
    opacity: 0.5,
  },
  number: {
    backgroundColor: 'rgba(255, 147, 39, 0.3)',
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  textContainer: {
    color: '#783c00',
    fontSize: 15,
    fontWeight: '900',
  },
});

export default MainDogs;
