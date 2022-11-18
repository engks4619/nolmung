import React from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import {MAIN_COLOR} from '~/const';
import Otherchat from '~/molecules/OtherChat';

interface chatFieldProps {
  fullMsg: any[];
  user: number;
  oppentImg: string;
}

function ChatField({fullMsg, user, oppentImg}: chatFieldProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={fullMsg}
        keyExtractor={item => item._id}
        inverted={true}
        renderItem={({item}) =>
          item?.user?.toString() === user.toString() ? (
            <Text style={styles.myChat}>{item.chat}</Text>
          ) : (
            <Otherchat content={item?.chat} oppentImg={oppentImg} />
          )
        }
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
});

export default ChatField;
