import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Heart from '@assets/heart.svg';
import Chat from '@assets/chat.svg';
import Profile from '~/atoms/Profile';

interface Props {
  writer: string;
  likeCnt: number;
  userImgUrl: string;
}

function CommUserInfo({writer, likeCnt, userImgUrl}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Profile imageSource={userImgUrl} width={15} height={15} />
        <Text style={styles.writer}>{writer}</Text>
      </View>
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
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  writer: {
    marginLeft: 5,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 0.7)',
  },
});

export default CommUserInfo;
