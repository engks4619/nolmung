import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Profile from '@atoms/Profile';
import {elapsedTime} from '@molecules/CommMainInfo';

interface DetailSubjectProps {
  subject: string;
  writer: string;
  modifyDate: string;
  userImgUrl: string;
}

function DetailSubject({
  subject,
  writer,
  modifyDate,
  userImgUrl,
}: DetailSubjectProps) {
  let convertDate = modifyDate?.split('T')[0];
  let convertTime = elapsedTime(modifyDate);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{subject}</Text>
      <View style={styles.subContainer}>
        <View style={styles.rowContainer}>
          <Profile imageSource={userImgUrl} width={20} height={20} />
          <Text style={styles.namePadding}>{writer}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text>{convertDate}</Text>
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
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  namePadding: {
    paddingLeft: 5,
    color: 'rgba(0, 0, 0, 0.7)',
  },
});

export default DetailSubject;
