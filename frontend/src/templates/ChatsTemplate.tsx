import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text} from 'react-native';
import ChatList from '~/organisms/ChatList';
import {chatListType} from '~/pages/Chats';

interface Props {
  myChatList: chatListType[];
  handleDetailChat: (chatInfo: chatListType) => void;
}

function ChatsTemplate({myChatList, handleDetailChat}: Props) {
  if (myChatList.length === 0) {
    return (
      <Text style={styles.emptyText}>
        커뮤니티 활동을 통해 다른 유저와 소통해보세요!
      </Text>
    );
  }
  return (
    <ScrollView>
      {myChatList.map((chatInfo, idx) => (
        <ChatList
          key={idx}
          chatInfo={chatInfo}
          handleDetailChat={handleDetailChat}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyText: {
    color: 'black',
    textAlign: 'center',
    marginTop: Dimensions.get('window').height * 0.3,
  },
});

export default ChatsTemplate;
