import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Profile from '@atoms/Profile';
import TextLine from '@atoms/TextLine';

interface Props {
  imageSource: string;
  userName: string;
  value: string;
  onChangeText: Function;
  isPassword: Boolean;
}

function UserEditForm({imageSource, userName, value, onChangeText}: Props) {
  return (
    <View style={styles.container}>
      <Profile imageSource={imageSource} />
      <View style={styles.description}>
        <Text style={styles.userName}>{'닉네임'}</Text>
        <TextLine
          placeholder={userName}
          onChangeText={onChangeText}
          value={value}
          isPassword={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 2,
    paddingBottom: 7,
  },
  userName: {
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: '700',
  },
  description:{
    width:260,
    height:93,
  }
});

export default UserEditForm;
