import React from 'react';
// import TextLine from '@atoms/TextLine';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import SvgIcon from '@assets/SvgIcon';

interface Props {
  BtnText: string;
  icon: any;
  onClick: () => void;
}

function TabButton({BtnText, icon, onClick}: Props) {
  return (
    <View style={styles.TabContainer}>
      <Pressable onPress={onClick} style={styles.PressableSpace}>
        <View>{icon}</View>
        <Text style={styles.TextSpace}>{BtnText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  TabContainer: {
    flexDirection: 'row',
    padding: 5,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 2,
    // backgroundColor: 'yellow',
    marginVertical: 1,
    alignItems: 'center',
  },
  PressableSpace: {
    flexDirection: 'row',
  },
  TextSpace: {
    height: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 0,
    // backgroundColor: 'red',
  },
});

export default TabButton;
