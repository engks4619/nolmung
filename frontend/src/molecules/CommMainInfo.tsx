import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  subject: string;
  walkDate: string;
  location: string;
  modifyDate: string;
}

function CommMainInfo({subject, walkDate, location, modifyDate}: Props) {
  return (
    <View>
      <View style={styles.subjectContainer}>
        <Text style={styles.headingText}>{subject}</Text>
        <Text>{modifyDate}</Text>
      </View>
      <Text>{walkDate}</Text>
      <Text>{location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subjectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CommMainInfo;
