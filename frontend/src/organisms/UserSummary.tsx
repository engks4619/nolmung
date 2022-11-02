import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import WalkSummary from '@molecules/WalkSummary';
import Profile from '@atoms/Profile';
import TextLine from '@atoms/TextLine';

interface Props {
  imageSource: string;
  userName: string;
  walkNumber: number;
  walkHour: number;
  walkDistance: number;
  isEditing?: boolean;
  value: string;
  onChangeText: Function;
  autoComplete: string;
  isPassword: Boolean;
}

function UserSummary({
  imageSource,
  userName,
  walkNumber,
  walkHour,
  walkDistance,
  isEditing = false,
  value,
  onChangeText,
}: Props) {
  return (
    <View style={styles.container}>
      <Profile imageSource={imageSource} />
      <View>
        <Text style={styles.userName}>{!isEditing ? userName : '닉네임'}</Text>
        {!isEditing ? (
          <WalkSummary
            firstLabel="산책 횟수"
            firstText={walkNumber}
            secondLabel="총 산책 시간"
            secondeText={walkHour}
            thirdLabel="총 산책 거리"
            thridText={walkDistance}
          />
        ) : (
          <TextLine
            placeholder={userName}
            onChangeText={onChangeText}
            value={value}
            // autoComplete={autoComplete}
            isPassword={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 2,
    paddingBottom: 7,
  },
  userName: {
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default UserSummary;
