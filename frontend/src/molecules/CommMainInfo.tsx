import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  subject: string;
  walkDate: string;
  location: string;
  modifyDate: string;
}

function elapsedTime(date: string) {
  const start: Date | any = new Date(date);
  const end: Date | any = new Date();

  const diff: number = end - start;

  const times = [
    {time: '년', milliSeconds: 1000 * 60 * 60 * 24 * 365},
    {time: '개월', milliSeconds: 1000 * 60 * 60 * 24 * 30},
    {time: '일', milliSeconds: 1000 * 60 * 60 * 24},
    {time: '시간', milliSeconds: 1000 * 60 * 60},
    {time: '분', milliSeconds: 1000 * 60},
  ];

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);
    if (betweenTime > 0) {
      return `${betweenTime}${value.time}전`;
    }
  }
  return '방금 전';
}

function convertTime(time: string) {
  const [hour, minute] = time.split(':');
  if (Number(hour) < 12) {
    return `AM ${hour}:${minute}`;
  }
  return `PM ${Number(hour) - 12}:${minute}`;
}

function CommMainInfo({subject, walkDate, location, modifyDate}: Props) {
  let [walkDateJsDate, walkDateJsTime] = walkDate.split('T');

  return (
    <View>
      <View style={styles.subjectContainer}>
        <Text style={styles.headingText}>
          {subject.length > 10 ? subject.slice(0, 10) + '...' : subject}
        </Text>
        <Text>{elapsedTime(modifyDate)}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text>{walkDateJsDate}</Text>
        <Text style={styles.time}>{convertTime(walkDateJsTime)}</Text>
      </View>
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
  dateContainer: {
    flexDirection: 'row',
  },
  time: {
    paddingLeft: 5,
  },
});

export default CommMainInfo;
