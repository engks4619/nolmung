import React from 'react';
import {View, Text} from 'react-native';
import UserSummary from '../organisms/UserSummary';

function MainTemplate() {
  return (
    <View>
      <UserSummary
        imageSource="https://reactnative.dev/img/tiny_logo.png"
        userName="userName"
        walkNumber={13}
        walkHour={500}
        walkDistance={500}
      />
    </View>
  );
}

export default MainTemplate;
