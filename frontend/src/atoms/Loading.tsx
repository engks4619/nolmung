import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {MAIN_COLOR} from '~/const';

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={MAIN_COLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
});

export default Loading;
