import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

function EmptyImg() {
  return (
    <View>
      <Image source={require('~/assets/logo.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100&',
  },
  logo: {
    width: '50%',
    height: 200,
  },
});

export default EmptyImg;
