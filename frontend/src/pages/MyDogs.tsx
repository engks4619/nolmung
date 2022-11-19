import React from 'react';
import {} from 'react-native';
import {RootState} from '~/store/reducer';
import MyDogsTemplate from '@templates/MyDogsTemplate';
import {useSelector} from 'react-redux';
export interface dogInfo {
  breedCodeValue: string;
  dogIdx: number;
  dogName: string;
  image: string;
  neuter: boolean;
  vaccination: boolean;
  gender: string;
}
function MyDogs() {
  const myDogs: dogInfo[] | undefined = useSelector(
    (state: RootState) => state.dogs.dogsInfo,
  );
  return <MyDogsTemplate myDogs={myDogs} />;
}

export default MyDogs;
