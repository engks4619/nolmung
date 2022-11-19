import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Pressable, Text, View} from 'react-native';
import CustomHeader from '~/headers/CustomHeader';
// import RegistMyDog from './RegistMyDog';
import {RootState} from '~/store/reducer';
import MyDogsTemplate from '@templates/MyDogsTemplate';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '~/store';
import axios from '~/utils/axios';
import {setDogsInfo} from '~/slices/dogsSlice';

export type MyDogsParamList = {
  MyDogs: undefined;
  RegistMyDog: undefined;
};

const MyDogStack = createNativeStackNavigator();

export const MyDogStackNavigator = () => (
  <MyDogStack.Navigator>
    <MyDogStack.Screen name="MyDogs" component={MyDogs} />
    {/* <MyDogStack.Screen name="RegistMyDog" component={RegistMyDog} /> */}
  </MyDogStack.Navigator>
);

export interface dogInfo {
  breedCodeValue: string;
  dogIdx: number;
  dogName: string;
  image: string;
  neuter: boolean;
  vaccination: boolean;
  gender: string;
}

function MyDogs({navigation}: any) {
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader navigation={navigation} middleText={'내 강아지'} />
      ),
    });
  }, [navigation]);

  const myDogs: dogInfo[] | undefined = useSelector(
    (state: RootState) => state.dogs.dogsInfo,
  );

  const dispatch = useAppDispatch();
  const deleteDog = async (idx: number) => {
    const response = await axios.delete(`user/dog/${idx}`);
    if (response.status === 200) {
      dispatch(setDogsInfo(response.data.dogList));
    }
  };
  return (
    <MyDogsTemplate
      myDogs={myDogs}
      navigation={navigation}
      deleteDog={(idx: number) => {
        deleteDog(idx);
      }}
    />
  );
}

export default MyDogs;
