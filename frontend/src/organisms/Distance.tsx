import React from 'react';
import {View, Text} from 'react-native';

interface Props {
  distance: number;
}

const Distance = ({distance}: Props) => {
  return (
    <View>
      <Text>{distance}</Text>
    </View>
  );
};
export default Distance;
