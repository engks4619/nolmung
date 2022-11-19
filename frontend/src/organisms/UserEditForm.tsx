import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  GestureResponderEvent,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Profile from '@atoms/Profile';
import TextLine from '@atoms/TextLine';
import MultipleImagePicker, {
  MediaType,
  ImageResults,
} from '@baronha/react-native-multiple-image-picker';
interface Props {
  imageSource: string;
  userName: string;
  value: string;
  onChangeText: Function;
  isPassword: Boolean;
  openPicker: () => Promise<void>;
}

function UserEditForm({
  imageSource,
  userName,
  value,
  onChangeText,
  openPicker,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.marginCotainer}>
        <TouchableOpacity onPress={openPicker}>
          <Profile imageSource={imageSource} width={70} height={70} />
        </TouchableOpacity>
        <View style={styles.description}>
          <Text style={styles.userName}>닉네임</Text>
          <TextLine
            placeholder={userName}
            onChangeText={onChangeText}
            value={value}
            isPassword={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    marginTop: 2,
    // paddingBottom: 7,
    // width: '100%',
  },
  marginCotainer: {
    flex: 1,
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  userName: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    paddingHorizontal: 15,
    width: 230,
    height: 90,
  },
});

export default UserEditForm;
