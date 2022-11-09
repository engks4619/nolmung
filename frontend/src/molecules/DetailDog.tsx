import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Profile from '@atoms/Profile';
import {MAIN_COLOR} from '~/const';

// export interface DetailDogProps {
//   name: string;
// }

function DetailDog() {
  return (
    <View style={styles.container}>
      <View style={styles.imgCotainer}>
        <Profile imageSource="/images/spot/default/default.png" />
      </View>
      <View style={styles.textContainer}>
        <Text>강아지이름</Text>
        <Text>견종</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150, // 강아지 사진 + 강아지 이름 + 견종 크기 알 수 잇는 방법은?
    height: 80,
    borderWidth: 1,
    borderColor: MAIN_COLOR,
    flexDirection: 'row',
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    justifyContent: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    paddingLeft: 5,
  },
  imgCotainer: {
    justifyContent: 'center',
  },
});

export default DetailDog;
