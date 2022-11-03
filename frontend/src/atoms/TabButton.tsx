import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

interface Props {
  name: string;
  BtnText: string;
  icon: any;
  onClick?: () => void | Function;
  // onClick: any;
  navigation: any;
}

function TabButton({
  name,
  BtnText,
  icon,
  onClick = () => {
    navigation.navigate('MyLikedList');
  },
  navigation,
}: Props) {
  return (
    <View style={styles.TabContainer}>
      <Pressable
        onPress={() => {
          onClick;
          // navigation.navigate('MyLikedList');
        }}
        style={styles.PressableSpace}>
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
  },
});

export default TabButton;
