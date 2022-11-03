import React from 'react';
// import TextLine from '@atoms/TextLine';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';

interface Props {
  BtnText: string;
  imgPath: string;
  onClick: () => void;
}

function TabButton({BtnText, imgPath, onClick}: Props) {
  return (
    <Pressable onPress={onClick}>
      <View style={styles.TabContainer}>
        <Image style={styles.ImageSpace} source={require(imgPath)} />
        <Text style={styles.TextSpace}>{BtnText}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  TabContainer: {
    flexDirection: 'row',
    padding: 5,
    height: 35,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ImageSpace: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    padding: 10,
  },
  TextSpace: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
});

export default TabButton;
