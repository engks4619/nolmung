import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {dogInfo} from '@pages/MyDogs';
import MyDog from '@organisms/MyDog';
interface Props {
  myDogs: dogInfo[] | undefined;
}
function MyDogsTemplate({myDogs}: Props) {
  return (
    <View style={styles.myDogsPageContainer}>
      <Text>내 강아지 추가/삭제</Text>
      <ScrollView overScrollMode="never">
        {myDogs?.length ? (
          <View>
            {myDogs.map(myDog => (
              <MyDog myDog={myDog} />
            ))}
          </View>
        ) : (
          <Text>내 강아지를 추가해주세욤</Text>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  myDogsPageContainer: {
    alignItems: 'center',
  },
});
export default MyDogsTemplate;
