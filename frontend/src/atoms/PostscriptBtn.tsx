import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import PostSend from '@assets/postSend.svg';
import {MAIN_COLOR} from '~/const';

function PostscriptBtn() {
  return (
    <Pressable style={styels.container}>
      <PostSend width={20} height={20} fill="black" />
      <Text style={styels.textStyle}>후기 보내기</Text>
    </Pressable>
  );
}

const styels = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    flexDirection: 'row',
    borderColor: MAIN_COLOR,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 3,
  },
});

export default PostscriptBtn;
