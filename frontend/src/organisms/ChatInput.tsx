import React from 'react';
import {TextInput, View, StyleSheet, Dimensions, Pressable} from 'react-native';
import Send from '@assets/send.svg';

const windowWidth = Dimensions.get('window').width;

interface ChatInputProps {
  msgInput: string;
  onChageMsg: (text: string) => void;
  submitMsg: (text: string) => void;
}

function ChatInput({msgInput, onChageMsg, submitMsg}: ChatInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="메세지 보내기"
        value={msgInput}
        onChangeText={text => onChageMsg(text)}
        onSubmitEditing={() => submitMsg(msgInput)}
      />
      <Pressable
        style={styles.svgContainer}
        onPress={() => submitMsg(msgInput)}>
        <Send width={25} height={25} fill={'black'} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    width: windowWidth,
    height: 70,
    borderColor: 'rgba(0, 0, 0, .5)',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginVertical: 15,
    paddingLeft: 10,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, .1)',
  },
  svgContainer: {
    justifyContent: 'center',
    marginRight: 20,
  },
});

export default ChatInput;
