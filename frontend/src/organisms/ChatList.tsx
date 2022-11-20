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
        <View>
          <Profile imageSource={chatInfo.userImgUrl} width={50} height={50} />
          <Text
            style={styles.oppentName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {chatInfo.nickname}
          </Text>
        </View>
        <Text style={styles.subjectStyle}>{chatInfo.subject}</Text>
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
  oppentName: {
    fontWeight: '600',
    color: 'black',
    fontSize: 12,
    width: 60,
    marginTop: 10,
  },
  subjectStyle: {
    fontWeight: 'bold',
    marginLeft: 15,
    fontSize: 14,
    color: 'black',
  },
});

export default ChatList;
