import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Squre from '@atoms/Squre';

interface detailProps {
  content: string;
  photoUrl: string[];
}

function DetailContent({content, photoUrl}: detailProps) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>{content}</Text>
        {photoUrl.length > 0
          ? photoUrl.map(path => <Squre imageSource={path} />)
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
  },
});

export default DetailContent;
