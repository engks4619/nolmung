import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Profile from '~/atoms/Profile';

interface Props {
  content: string;
  oppentImg: string;
}

function Otherchat({content, oppentImg}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Profile imageSource={oppentImg} width={25} height={25} />
      </View>
      <Text style={styles.chatStyle}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  profileContainer: {
    paddingVertical: 10,
    marginLeft: 7,
  },
  chatStyle: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
    marginVertical: 8,
    color: 'white',
    backgroundColor: '#bdbdbd',
    fontSize: 15,
    borderRadius: 15,
  },
});

export default Otherchat;
