import React from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import {MAIN_COLOR} from '~/const';

interface chatFieldProps {
  serverMsg: any[];
  user: number;
}

function ChatField({serverMsg, user}: chatFieldProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={serverMsg}
        keyExtractor={item => item._id}
        inverted={false}
        renderItem={({item}) => (
          <Text
            style={
              item.user.toString() === user.toString()
                ? styles.myChat
                : styles.otherChat
            }>
            {item.chat}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myChat: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginVertical: 8,
    color: 'white',
    backgroundColor: MAIN_COLOR,
    fontSize: 15,
    borderRadius: 15,
  },
  otherChat: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
    marginVertical: 8,
    color: 'white',
    backgroundColor: 'gray',
    fontSize: 15,
    borderRadius: 15,
  },
});

export default ChatField;
