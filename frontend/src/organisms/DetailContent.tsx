import React from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import Squre from '@atoms/Squre';

interface detailProps {
  content: string;
  photoUrl: string[];
}

const Width = Dimensions.get('window').width * 0.85;

function DetailContent({content, photoUrl}: detailProps) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.textContainer}>
            <Text style={styles.textStyle}>{content}</Text>
          </Text>
          {photoUrl?.length > 0
            ? photoUrl.map((path, idx) => (
                <View key={idx} style={styles.imgContainer}>
                  <Squre imageSource={path} width={Width} height={350} />
                </View>
              ))
            : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    marginBottom: 55,
  },
  contentContainer: {
    width: Width,
  },
  textContainer: {
    lineHeight: 27,
    marginTop: 10,
    marginBottom: 50,
  },
  textStyle: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.7)',
  },
  imgContainer: {
    alignItems: 'center',
  },
});

export default DetailContent;
