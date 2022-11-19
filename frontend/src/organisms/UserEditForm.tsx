import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Profile from '@atoms/Profile';
import TextLine from '@atoms/TextLine';
import ProfileTmp from '@atoms/ProfileTmp';
interface Props {
  imageSource: string;
  userName: string;
  value: string;
  onChangeText: Function;
  isPassword: Boolean;
  openPicker: () => Promise<void>;
  tempProfileImage: any;
}

function UserEditForm({
  imageSource,
  userName,
  value,
  onChangeText,
  openPicker,
  tempProfileImage,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.marginCotainer}>
        <TouchableOpacity onPress={openPicker}>
          {tempProfileImage ? (
            <ProfileTmp
              imageSource={tempProfileImage.path}
              width={70}
              height={70}
            />
          ) : (
            <Profile imageSource={imageSource} width={70} height={70} />
          )}
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
    marginTop: 2,
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
