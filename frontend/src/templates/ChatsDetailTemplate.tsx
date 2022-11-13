import React from 'react';
import {View, StyleSheet} from 'react-native';
import ChatPostInfo from '~/organisms/ChatPostInfo';
import ChatInput from '~/organisms/ChatInput';
import ChatField from '~/organisms/ChatField';

function ChatsDetailTemplate({
  postInfo,
  msgInput,
  onChageMsg,
  submitMsg,
  serverMsg,
  user,
}) {
  return (
    <View style={styles.container}>
      <ChatPostInfo
        postSubject={postInfo.postSubject}
        postImgae={postInfo.postImage}
        postPay={postInfo.postPay}
      />

      <ChatField serverMsg={serverMsg} user={user} />
      <View style={styles.inputContainer}>
        <ChatInput
          msgInput={msgInput}
          onChageMsg={onChageMsg}
          submitMsg={submitMsg}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  inputContainer: {
    height: 70,
  },
});

export default ChatsDetailTemplate;
