import React from 'react';
import {ScrollView} from 'react-native';
import ChatList from '~/organisms/ChatList';
import {chatListType} from '~/pages/Chats';

interface Props {
  myChatList: chatListType[];
  handleDetailChat: (chatInfo: chatListType) => void;
}

function ChatsTemplate({myChatList, handleDetailChat}: Props) {
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

export default ChatsTemplate;
