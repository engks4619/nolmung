import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import RegistMyDog from './RegistMyDog';

export type MyDogsParamList = {
  MyDogs: undefined;
  RegistMyDog: undefined;
};

const MyDogStack = createNativeStackNavigator();

export const MyDogStackNavigator = () => (
  <MyDogStack.Navigator>
    <MyDogStack.Screen
      name="MyDogs"
      component={MyDogs}
      // options={{headerShown: false}}
    />
    <MyDogStack.Screen
      name="RegistMyDog"
      component={RegistMyDog}
      options={{headerShown: false}}
    />
  </MyDogStack.Navigator>
);

// type DogScreenProp = NativeStackNavigationProp<MyDogsParamList, 'MyDogs'>;

// const navigation = useNavigation<DogScreenProp>();
function MyDogs({navigation}: any) {
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
