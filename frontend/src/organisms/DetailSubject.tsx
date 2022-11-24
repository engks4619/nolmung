import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Profile from '@atoms/Profile';
import Poop from '@assets/poop.svg';
import Lead from '@assets/lead.svg';

interface DetailSubjectProps {
  subject: string;
  writer: string;
  modifyDate: string;
  userImgUrl: string;
  leadLine: boolean;
  poopBag: boolean;
  writerIdx: number;
  naviOppent: (oppentIdx: number) => void;
}

function DetailSubject({
  subject,
  writer,
  userImgUrl,
  leadLine,
  poopBag,
  writerIdx,
  naviOppent,
}: DetailSubjectProps) {
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
          {leadLine ? <Lead width={25} height={25} fill="black" /> : null}
          <View style={styles.svgContainer}>
            <View style={styles.rowContainer}>
              {poopBag ? <Poop width={25} height={25} fill="black" /> : null}
            </View>
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
    alignItems: 'center',
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
