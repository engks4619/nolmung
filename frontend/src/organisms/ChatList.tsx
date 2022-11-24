import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Profile from '~/atoms/Profile';
import Squre from '~/atoms/Squre';
import {chatListType} from '~/pages/Chats';

interface Props {
  chatInfo: chatListType;
  handleDetailChat: (chatInfo: chatListType) => void;
}

function ChatList({chatInfo, handleDetailChat}: Props) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => handleDetailChat(chatInfo)}>
      <View style={styles.infoContaier}>
        <Profile imageSource={chatInfo.userImgUrl} width={50} height={50} />
        <View style={styles.textContainer}>
          <Text
            style={styles.oppentName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {chatInfo.nickname}
          </Text>
          <Text style={styles.subjectStyle}>{chatInfo.subject}</Text>
        </View>
      </View>
      <Squre
        imageSource={chatInfo.thumbnailUrl}
        width={65}
        height={65}
        borderRadius={10}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 5,
    padding: 15,
    justifyContent: 'space-between',
  },
  infoContaier: {
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 15,
  },
  oppentName: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 14,
    width: 200,
  },
  subjectStyle: {
    width: 200,
    fontSize: 13,
    marginTop: 10,
    color: 'black',
  },
});

export default ChatList;
