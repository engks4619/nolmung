import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {convertTime} from '@molecules/CommMainInfo';
import Location from '@assets/location.svg';
import Clock from '@assets/clock.svg';

interface DetailWalkProps {
  location: string;
  walkDate: string;
}

function DetailWalk({location, walkDate}: DetailWalkProps) {
  let day = walkDate?.split('T')[0].slice(5);
  let time = walkDate ? convertTime(walkDate.split('T')[1]) : null;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Location width={30} height={30} fill="black" />
        <Text style={styles.textCenter}>{location}</Text>
      </View>
      <View style={[styles.infoContainer]}>
        <Clock width={30} height={30} fill="black" />
        <Text style={styles.textCenter}>{day}</Text>
        <Text style={styles.textCenter}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: 3,
    justifyContent: 'space-around',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textCenter: {
    fontSize: 13,
    color: 'black',
    marginLeft: 5,
  },
});

export default DetailWalk;
