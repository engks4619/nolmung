import React from 'react';
import {Text, View} from 'react-native';
import RegistMyDogTemplate from '~/templates/RegistMyDogTemplate';

const RegistMyDog = ({navigation}: any) => {
  return (
    <View>
      <RegistMyDogTemplate navigation={navigation} />
    </View>
  );
};

export default RegistMyDog;
