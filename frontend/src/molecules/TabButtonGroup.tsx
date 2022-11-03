import React from 'react';
import {StyleSheet, View} from 'react-native';

import TabButton from '@atoms/TabButton';

export interface TabButtonObject {
  name: string;
  icon: any;
  BtnText: string;
  onClick?: () => void | Function;
}

interface Props {
  TabButtonList: Array<TabButtonObject>;
  navigation: any;
}

function TabButtonGroup({TabButtonList, navigation}: Props) {
  return (
    <View style={styles.ButtonGroup}>
      {TabButtonList.map(value => (
        <TabButton
          key={value.name}
          name={value.name}
          BtnText={value.BtnText}
          icon={value.icon}
          onClick={value.onClick}
          navigation={navigation}
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
