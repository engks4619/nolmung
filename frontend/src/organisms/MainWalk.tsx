import React from 'react';
import {View, StyleSheet} from 'react-native';
import MyButton from '~/atoms/MyButton';
import MainDogs from '~/molecules/MainDogs';

function MainWalk() {
  return (
    <View style={styles.container}>
      <View style={styles.marginContainer}>
        <MainDogs />
        <MyButton
          btnText="산책 시작하기"
          width={200}
          height={50}
          onClick={() => console.log('산책 시작')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, .5)',
  },
  marginContainer: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default MainWalk;
