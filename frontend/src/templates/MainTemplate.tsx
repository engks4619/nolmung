import React from 'react';
import {View} from 'react-native';
import UserSummary from '@organisms/UserSummary';
import MainSpots from '@organisms/MainSpots';

interface Props {
  spots: any[];
}
function MainTemplate({spots}: Props) {
  return (
    <View>
      <UserSummary
        imageSource="https://reactnative.dev/img/tiny_logo.png"
        userName="userName"
        walkNumber={13}
        walkHour={500}
        walkDistance={500}
      />
      <MainSpots spots={spots} />
    </View>
  );
}

export default MainTemplate;
