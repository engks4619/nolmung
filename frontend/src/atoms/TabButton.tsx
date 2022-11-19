import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

interface Props {
  name: string;
  btnText: string;
  icon: any;
  onClick: (params?: string) => void;
}

function TabButton({name, btnText, icon, onClick}: Props) {
  return (
    <View>
      <Pressable
        onPress={() => {
          onClick(name);
        }}
        style={styles.PressableSpace}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.textContainer}>
          <Text style={styles.TextSpace}>{btnText}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  PressableSpace: {
    flexDirection: 'row',
    height: 35,
    alignItems: 'center',
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  textContainer: {
    justifyContent: 'flex-end',
    color: 'black',
  },
  TextSpace: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
    paddingVertical: 0,
  },
});

export default TabButton;
