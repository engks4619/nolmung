import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

const contentHeight = Dimensions.get('window').width * 0.8;

function DetailContent() {
  return (
    <View style={styles.container}>
      <Text>Detail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 3,
    height: contentHeight,
  },
});

export default DetailContent;
