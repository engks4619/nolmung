import React from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Profile from '~/atoms/Profile';
import Squre from '~/atoms/Squre';
import ChatList from '~/organisms/ChatList';
import {chatListType} from '~/pages/Chats';

interface Props {
  myChatList: chatListType[];
  handleDetailChat: (chatInfo: chatListType) => void;
  refresh: Function;
  refreshing: boolean;
}

function ChatsTemplate({
  myChatList,
  handleDetailChat,
  refresh,
  refreshing,
}: Props) {
  const onRefresh = () => {
    if (!refreshing) {
      refresh();
    }
  };

  return (
    <>
      <FlatList
        data={myChatList}
        onRefresh={onRefresh}
        renderItem={({item}) => (
          <Pressable
            style={styles.container}
            onPress={() => handleDetailChat(item)}>
            <View style={styles.infoContaier}>
              <View>
                <Profile imageSource={item.userImgUrl} width={50} height={50} />
                <Text
                  style={styles.oppentName}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.nickname}
                </Text>
              </View>
              <Text style={styles.subjectStyle}>{item.subject}</Text>
            </View>
            <Squre
              imageSource={item.thumbnailUrl}
              width={65}
              height={65}
              borderRadius={10}
            />
          </Pressable>
        )}
      />
      {/* <ScrollView>
      {myChatList.map((chatInfo, idx) => (
        <ChatList
        key={idx}
        chatInfo={chatInfo}
        handleDetailChat={handleDetailChat}
        refresh={refresh}
        />
        ))}
    </ScrollView> */}
    </>
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

export default ChatsTemplate;
