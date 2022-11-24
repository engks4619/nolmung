import React, {Dispatch, SetStateAction} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, Text} from 'react-native';
import ChatList from '~/organisms/ChatList';
import {chatListType} from '~/pages/Chats';

interface Props {
  myChatList: chatListType[];
  handleDetailChat: (chatInfo: chatListType) => void;
  refreshing: boolean;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  refresh: () => void;
}

const renderEmpty = () => {
  return (
    <Text style={styles.emptyText}>
      커뮤니티 활동을 통해 다른 유저와 소통해보세요!
    </Text>
  );
};

function ChatsTemplate({
  myChatList,
  handleDetailChat,
  refreshing,
  setRefreshing,
  refresh,
}: Props) {
  const onRefresh = () => {
    if (!refreshing) {
      refresh();
    }
  };

  return (
    <FlatList
      data={myChatList}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={(item, idx) => String(idx)}
      renderItem={({item}) => (
        <ChatList chatInfo={item} handleDetailChat={handleDetailChat} />
      )}
      ListEmptyComponent={renderEmpty}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
  },
  emptyText: {
    color: 'black',
    textAlign: 'center',
    marginTop: Dimensions.get('window').height * 0.3,
  },
});

export default ChatsTemplate;
