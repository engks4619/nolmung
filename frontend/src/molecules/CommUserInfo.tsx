import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Heart from '@assets/heart.svg';
import Chat from '@assets/chat.svg';

interface Props {
  writer: string;
  likeCnt: number;
}

function CommUserInfo({writer, likeCnt}: Props) {
  return (
    <View style={styles.container}>
      <Text>{writer}</Text>
      <View style={styles.svgContainer}>
        <Chat width={20} height={20} fill={'black'} />
        <Text>13</Text>
        <Heart width={20} height={20} fill={'black'} />
        <Text>{likeCnt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  svgContainer: {
    flexDirection: 'row',
  },
});

export default CommUserInfo;
