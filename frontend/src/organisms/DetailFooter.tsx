import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Heart from '@assets/heart.svg';
import MyButton from '@atoms/MyButton';

const windowWidth = Dimensions.get('window').width;

function DetailFooter() {
  return (
    <View style={styles.container}>
      <View style={styles.heartContainer}>
        <Heart height={30} width={30} fill="black" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textBold}>같이 산책🤎</Text>
        <MyButton
          btnText="채팅목록"
          width={80}
          paddingVertical={10}
          onClick={() => console.log('채팅목록')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    width: windowWidth,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  heartContainer: {
    paddingHorizontal: 5,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBold: {
    fontWeight: '800',
  },
});

export default DetailFooter;
