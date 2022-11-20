import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  subject: string;
  location: string;
  modifyDate: string;
}

export function elapsedTime(date: string) {
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

export function convertTime(time: string) {
  const [hour, minute] = time.split(':');
  if (Number(hour) < 12) {
    return `오전 ${hour}:${minute}`;
  }
  return `오후 ${Number(hour) - 12}:${minute}`;
}

function CommMainInfo({subject, location, modifyDate}: Props) {
  return (
    <View>
      <View style={styles.subjectContainer}>
        <Text style={styles.headingText} numberOfLines={1} ellipsizeMode="tail">
          {subject}
        </Text>
        <Text style={styles.smallFont}>{elapsedTime(modifyDate)}</Text>
      </View>
      <Text style={styles.smallFont}>{location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subjectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    width: 190,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  smallFont: {
    marginTop: 3,
    fontSize: 13,
  },
});

export default CommMainInfo;
