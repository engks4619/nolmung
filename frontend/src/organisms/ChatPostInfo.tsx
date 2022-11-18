import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PostscriptBtn from '~/atoms/PostscriptBtn';
import ScheduleBtn from '~/atoms/ScheduleBtn';
import Squre from '~/atoms/Squre';

interface chatsPostInfoProps {
  postSubject: string;
  postImgae: string;
  postPay: number;
}

function ChatPostInfo({postSubject, postImgae, postPay}: chatsPostInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.postInfoContainer}>
        <Squre imageSource={postImgae} width={70} height={70} />
        <View style={styles.textContainer}>
          <Text style={styles.bold}>{postSubject}</Text>
          <Text style={styles.bold}>
            {postPay !== null ? `${postPay.toLocaleString('ko-KR')}원` : null}
          </Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <ScheduleBtn />
        <PostscriptBtn />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'space-between',
  },
  postInfoContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'space-around',
  },
  bold: {
    fontWeight: '600',
    fontSize: 14,
    color: 'black',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default ChatPostInfo;
