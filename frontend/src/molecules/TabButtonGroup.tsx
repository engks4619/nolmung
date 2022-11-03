import React from 'react';
import {View} from 'react-native';
// import UserSummary from '@organisms/UserSummary';
// import type {UserInfoType} from '../pages/Mypage';
// import MyButton from '@atoms/MyButton';
import TabButton from '@atoms/TabButton';
// import {NavigationContainer} from '@react-navigation/native';

export interface TabButtonObject {
  name: string;
  imgPath: string;
  BtnText: string;
  onClick: () => void;
}

interface Props {
  TabButtonList: Array<TabButtonObject>;
}

function TabButtonGroup({TabButtonList}: Props) {
  return (
    <View>
      {TabButtonList.map(value => (
        <TabButton
          key={value.name}
          BtnText={value.BtnText}
          imgPath={value.imgPath}
          onClick={value.onClick}
        />
      ))}
    </View>
  );
}

export default TabButtonGroup;
