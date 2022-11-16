import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WalkSummary from '@molecules/WalkSummary';
import Profile from '@atoms/Profile';

interface Props {
  imageSource: string;
  userName: string;
  walkNumber: number;
  walkHour: number;
  walkDistance: number;
}

function UserSummary({
  imageSource,
  userName,
  walkNumber,
  walkHour,
  walkDistance,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.marginCotainer}>
        <Profile imageSource={imageSource} width={70} height={70} />
        <View style={styles.description}>
          <Text style={styles.userName}>{userName}</Text>
          <WalkSummary
            firstLabel="산책 횟수"
            firstText={walkNumber}
            secondLabel="총 산책 시간"
            secondeText={walkHour}
            thirdLabel="총 산책 거리"
            thridText={walkDistance}
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
    height: 90,
  },
});

export default UserSummary;
