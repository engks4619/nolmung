import React from 'react';
import {View, StyleSheet} from 'react-native';
import ChatPostInfo from '~/organisms/ChatPostInfo';

function ChatsDetailTemplate() {
  return (
    <View style={styles.container}>
      <ChatPostInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default ChatsDetailTemplate;
