import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Profile from '@atoms/Profile';
import Poop from '@assets/poop.svg';
import Lead from '@assets/lead.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CommunityParamList} from '~/pages/Community';
import {useNavigation} from '@react-navigation/native';

interface DetailSubjectProps {
  subject: string;
  writer: string;
  modifyDate: string;
  userImgUrl: string;
  leadLine: boolean;
  poopBag: boolean;
  writerIdx: number;
}

type CommScreenProp = NativeStackNavigationProp<
  CommunityParamList,
  'Community'
>;
function DetailSubject({
  subject,
  writer,
  userImgUrl,
  leadLine,
  poopBag,
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
          {leadLine ? <Poop width={30} height={30} fill="black" /> : null}
          <View style={styles.svgContainer}>
            {poopBag ? <Lead width={30} height={30} fill="black" /> : null}
          </View>
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
    alignItems: 'flex-end',
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
  svgContainer: {
    marginHorizontal: 3,
  },
});

export default DetailSubject;
