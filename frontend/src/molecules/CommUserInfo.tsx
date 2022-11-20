import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Chat from '@assets/chat.svg';
import Profile from '~/atoms/Profile';

interface Props {
  writer: string;
  userImgUrl: string;
  chatCnt: number;
}

function CommUserInfo({writer, chatCnt, userImgUrl}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Profile imageSource={userImgUrl} width={15} height={15} />
        <Text style={styles.writer}>{writer}</Text>
      </View>
      <View style={styles.svgContainer}>
        <Chat width={13} height={13} fill={'black'} />
        <Text style={styles.svgMargin}>{chatCnt}</Text>
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
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  writer: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.7)',
  },
  svgMargin: {
    marginHorizontal: 3,
  },
});

export default CommUserInfo;
