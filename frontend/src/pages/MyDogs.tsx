import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Pressable, Text, View} from 'react-native';
import CustomHeader from '~/headers/CustomHeader';
import RegistMyDog from './RegistMyDog';

export type MyDogsParamList = {
  MyDogs: undefined;
  RegistMyDog: undefined;
};

const MyDogStack = createNativeStackNavigator();

export const MyDogStackNavigator = () => (
  <MyDogStack.Navigator>
    <MyDogStack.Screen name="MyDogs" component={MyDogs} />
    <MyDogStack.Screen name="RegistMyDog" component={RegistMyDog} />
  </MyDogStack.Navigator>
);

function MyDogs({navigation}: any) {
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader navigation={navigation} middleText={'내 강아지'} />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>내 강아지</Text>
      <Pressable onPress={() => navigation.navigate('RegistMyDog')}>
        <Text>강아지 등록</Text>
      </Pressable>
    </View>
  );
}

export default MyDogs;
