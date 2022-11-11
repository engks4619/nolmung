import React from 'react';
import {View, Text} from 'react-native';

function LogView({route}: any) {
  const isOver = route.params.isOver;
  console.log(isOver);
  if (isOver) {
    return (
      <View>
        <Text>LogView-over</Text>
        <Text>{typeof isOver}</Text>
        <Text>{isOver}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>LogView-under</Text>
      </View>
    );
  }
}
export default LogView;
