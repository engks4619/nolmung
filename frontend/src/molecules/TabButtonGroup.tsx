import React from 'react';
import {StyleSheet, View} from 'react-native';

import TabButton from '@atoms/TabButton';

export interface TabButtonObject {
  name: string;
  icon: any;
  btnText: string;
}

interface Props {
  TabButtonList: Array<TabButtonObject>;
  func: (params?: string) => void;
}

function TabButtonGroup({TabButtonList, func}: Props) {
  return (
    <View style={styles.ButtonGroup}>
      {TabButtonList.map(value => (
        <TabButton
          key={value.name}
          name={value.name}
          btnText={value.btnText}
          icon={value.icon}
          onClick={func}
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
