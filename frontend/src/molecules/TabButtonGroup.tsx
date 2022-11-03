import React from 'react';
import {StyleSheet, View} from 'react-native';
// import UserSummary from '@organisms/UserSummary';
// import type {UserInfoType} from '../pages/Mypage';
// import MyButton from '@atoms/MyButton';
import TabButton from '@atoms/TabButton';
// import {NavigationContainer} from '@react-navigation/native';

export interface TabButtonObject {
  name: string;
  icon: any;
  BtnText: string;
  onClick: () => void;
}

interface Props {
  TabButtonList: Array<TabButtonObject>;
}

function TabButtonGroup({TabButtonList}: Props) {
  return (
    <View style={styles.ButtonGroup}>
      {TabButtonList.map(value => (
        <TabButton
          key={value.name}
          BtnText={value.BtnText}
          icon={value.icon}
          onClick={value.onClick}
        />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  ButtonGroup: {
    borderTopColor: 'gray',
    borderTopWidth: 1,
    marginTop: 2,
  },
});

export default TabButtonGroup;
