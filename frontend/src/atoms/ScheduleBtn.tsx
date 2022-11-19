import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Schedule from '@assets/schedule.svg';
import {MAIN_COLOR} from '~/const';

function ScheduleBtn({handleConfirmWalk}) {
  return (
    <Pressable onPress={() => handleConfirmWalk()} style={styels.container}>
      <Schedule width={20} height={20} fill="black" />
      <Text style={styels.textStyle}>산책 확정하기</Text>
    </Pressable>
  );
}

const styels = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    flexDirection: 'row',
    borderColor: MAIN_COLOR,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 3,
  },
});

export default ScheduleBtn;
