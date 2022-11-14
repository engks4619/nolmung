import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import MyButton from '~/atoms/MyButton';
import Profile from '~/atoms/Profile';
import {RootState} from '~/store/reducer';

interface dogInfo {
  breedCodeValue: string;
  dogIdx: number;
  dogName: string;
  image: string;
}

function MainDogs() {
  const myDogs: dogInfo[] | undefined = useSelector(
    (state: RootState) => state.dogs.dogsInfo,
  );
  if (myDogs.length <= 1) {
    return <Profile imageSource={myDogs[0].image} width={50} height={50} />;
  } else {
    return (
      <View>
        <Profile imageSource={myDogs[0].image} width={70} height={70} />
        {/* <Profile imageSource={myDogs[1].image} width={30} height={30} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgContainer: {
    flexDirection: 'row',
  },
  marginContainer: {
    margin: 15,
  },
});

export default MainDogs;
