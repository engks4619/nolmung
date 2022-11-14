import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ChatInfoSummary = ({chatInfo}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {chatInfo.me} 님, {chatInfo.opponent} 님이 어떠셨나요?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default ChatInfoSummary;
