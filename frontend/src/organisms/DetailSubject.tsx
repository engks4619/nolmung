import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Profile from '@atoms/Profile';
import {elapsedTime} from '@molecules/CommMainInfo';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CommunityParamList} from '~/pages/Community';
import {useNavigation} from '@react-navigation/native';

interface DetailSubjectProps {
  subject: string;
  writer: string;
  modifyDate: string;
  userImgUrl: string;
  writerIdx: number;
}

type CommScreenProp = NativeStackNavigationProp<
  CommunityParamList,
  'Community'
>;
function DetailSubject({
  subject,
  writer,
  modifyDate,
  userImgUrl,
  writerIdx,
}: DetailSubjectProps) {
  const navigation = useNavigation<CommScreenProp>();

  const naviOppent = (oppentIdx: number) => {
    navigation.navigate('Oppent', {oppentIdx});
  };

  let convertDate = modifyDate?.split('T')[0];
  let convertTime = elapsedTime(modifyDate);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{subject}</Text>
      <View style={styles.subContainer}>
        <Pressable
          style={styles.rowContainer}
          onPress={() => naviOppent(writerIdx)}>
          <Profile imageSource={userImgUrl} width={17} height={17} />
          <Text style={styles.namePadding}>{writer}</Text>
        </Pressable>
        <View style={styles.rowContainer}>
          <Text style={styles.namePadding}>{convertDate}</Text>
          <Text style={styles.namePadding}>{convertTime}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    height: 90,
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
  },
  namePadding: {
    marginLeft: 5,
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.7)',
  },
});

export default DetailSubject;
