import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Profile from '@atoms/Profile';

interface DetailSubjectProps {
  subject: string;
  writer: string;
  modifyDate: string;
}

function DetailSubject({subject, writer, modifyDate}: DetailSubjectProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{subject}</Text>
      <View style={styles.subContainer}>
        <View style={styles.profileContainer}>
          <Profile
            imageSource="https://reactnative.dev/img/tiny_logo.png"
            width={20}
            height={20}
          />
          <Text style={styles.namePadding}>{writer}</Text>
        </View>
        <Text>{modifyDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    height: 60,
    justifyContent: 'space-between',
  },
  profileContainer: {
    flexDirection: 'row',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  namePadding: {
    paddingLeft: 5,
  },
});

export default DetailSubject;
