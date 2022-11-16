import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Coord} from 'react-native-nmap';
import {addDistance} from '~/slices/myPositionSlice';

// distance component에서 path/mypostion 변화를 감지하고
// haversine 계산을 통해 redux를 바꿔줌
// myPositionFunction으로 빼려니까 위치변화가 감지 될 떄 path에 접근할 수 있어야하는데
// 어려움
interface Props {
  path: Coord[];
  distance: number;
  dispatch: any;
}
const haversine = require('haversine');

const Distance = ({path = [], distance, dispatch}: Props) => {
  useEffect(() => {
    if (path.length >= 2) {
      const d = haversine(path[path.length - 1], path[path.length - 2], {
        unit: 'meter',
      });
      dispatch(addDistance(d));
    }
  }, [path]);
  return (
    <View>
      <Text>{distance}</Text>
    </View>
  );
};
export default Distance;
