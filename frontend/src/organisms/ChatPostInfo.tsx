import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import MyButton from '~/atoms/MyButton';
import Squre from '~/atoms/Squre';

interface chatsPostInfoProps {
  postSubject: string;
  postImgae: string;
  postPay: number;
  handleConfirmWalk: () => void;
}

function ChatPostInfo({
  postSubject,
  postImgae,
  postPay,
  handleConfirmWalk,
}: chatsPostInfoProps) {
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
        <MyButton
          btnText="산책 확정"
          width={100}
          height={45}
          fontSize={14}
          onClick={() => handleConfirmWalk()}
        />
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
    justifyContent: 'center',
  },
});

export default ChatPostInfo;
